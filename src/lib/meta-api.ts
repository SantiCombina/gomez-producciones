export interface MetaPostPayload {
  title: string;
  slug: string;
  featuredImageUrl?: string;
}

const GRAPH_API = 'https://graph.facebook.com/v21.0';

function getCredentials() {
  const pageId = process.env.META_FB_PAGE_ID;
  const accessToken = process.env.META_FB_ACCESS_TOKEN;
  const igAccountId = process.env.META_IG_ACCOUNT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return { pageId, accessToken, igAccountId, siteUrl };
}

export async function postToFacebookPage(post: MetaPostPayload): Promise<void> {
  const { pageId, accessToken, siteUrl } = getCredentials();

  if (!pageId || !accessToken) {
    console.warn(
      '[meta-api] META_FB_PAGE_ID o META_FB_ACCESS_TOKEN no configurados. Omitiendo publicación en Facebook.',
    );
    return;
  }

  const postUrl = siteUrl ? `${siteUrl}/noticias/${post.slug}` : undefined;
  const message = postUrl ? `${post.title}\n\n${postUrl}` : post.title;

  try {
    const body: Record<string, string> = { message, access_token: accessToken };
    if (postUrl) body.link = postUrl;

    const res = await fetch(`${GRAPH_API}/${pageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('[meta-api] Error publicando en Facebook:', res.status, error);
      return;
    }

    console.log('[meta-api] Publicado en Facebook correctamente:', post.slug);
  } catch (error) {
    console.error('[meta-api] Error de red al publicar en Facebook:', error);
  }
}

export async function postToInstagram(post: MetaPostPayload): Promise<void> {
  const { accessToken, igAccountId } = getCredentials();

  if (!accessToken || !igAccountId) {
    console.warn(
      '[meta-api] META_FB_ACCESS_TOKEN o META_IG_ACCOUNT_ID no configurados. Omitiendo publicación en Instagram.',
    );
    return;
  }

  if (!post.featuredImageUrl) {
    console.warn('[meta-api] Instagram requiere imagen principal. Omitiendo publicación:', post.slug);
    return;
  }

  try {
    // Paso 1: crear media container
    const containerRes = await fetch(`${GRAPH_API}/${igAccountId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: post.featuredImageUrl,
        caption: post.title,
        access_token: accessToken,
      }),
    });

    if (!containerRes.ok) {
      const error = await containerRes.text();
      console.error('[meta-api] Error creando container en Instagram:', containerRes.status, error);
      return;
    }

    const { id: creationId } = (await containerRes.json()) as { id: string };

    // Paso 2: publicar el container
    const publishRes = await fetch(`${GRAPH_API}/${igAccountId}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken,
      }),
    });

    if (!publishRes.ok) {
      const error = await publishRes.text();
      console.error('[meta-api] Error publicando en Instagram:', publishRes.status, error);
      return;
    }

    console.log('[meta-api] Publicado en Instagram correctamente:', post.slug);
  } catch (error) {
    console.error('[meta-api] Error de red al publicar en Instagram:', error);
  }
}

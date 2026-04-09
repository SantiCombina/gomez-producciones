# Social Media Cross-Posting Specification

## Purpose

Define el comportamiento de publicación automática en Facebook e Instagram al crear o actualizar un post en Payload CMS.

## Requirements

### Requirement: Publicación en Facebook

El sistema MUST publicar en la Facebook Page configurada cuando el campo `postToFacebook` está activo al guardar un post.

La publicación MUST incluir el título del post y la URL pública. Si existe `featuredImage`, SHOULD incluirla como imagen adjunta.

#### Scenario: Post con imagen publicado en Facebook

- GIVEN un post con `postToFacebook: true` y `featuredImage` definida
- WHEN el post es creado o actualizado
- THEN el sistema publica en la Facebook Page con título, URL e imagen
- AND `postToFacebook` queda reseteado a `false` tras la publicación

#### Scenario: Post sin imagen publicado en Facebook

- GIVEN un post con `postToFacebook: true` y sin `featuredImage`
- WHEN el post es creado o actualizado
- THEN el sistema publica en Facebook con título y URL (solo texto)

#### Scenario: Token de Facebook no configurado

- GIVEN `META_FB_ACCESS_TOKEN` no está definido en el entorno
- WHEN el post es guardado con `postToFacebook: true`
- THEN el post se guarda correctamente en Payload
- AND el sistema loguea una advertencia en el servidor
- AND NO se intenta llamar a la API de Meta

---

### Requirement: Publicación en Instagram

El sistema MUST publicar en la cuenta Instagram Business configurada cuando `postToInstagram` está activo y el post tiene `featuredImage`.

#### Scenario: Post con imagen publicado en Instagram

- GIVEN un post con `postToInstagram: true` y `featuredImage` definida
- WHEN el post es creado o actualizado
- THEN el sistema publica la imagen en Instagram con caption que incluye el título
- AND `postToInstagram` queda reseteado a `false` tras la publicación

#### Scenario: Post sin imagen con Instagram tildado

- GIVEN un post con `postToInstagram: true` y sin `featuredImage`
- WHEN el post es creado o actualizado
- THEN el sistema NO publica en Instagram
- AND loguea un warning indicando que Instagram requiere imagen
- AND el post se guarda correctamente en Payload

#### Scenario: Token de Instagram no configurado

- GIVEN `META_IG_ACCOUNT_ID` o `META_FB_ACCESS_TOKEN` no están definidos
- WHEN el post es guardado con `postToInstagram: true`
- THEN el post se guarda correctamente en Payload
- AND el sistema loguea una advertencia
- AND NO se intenta llamar a la API de Meta

---

### Requirement: Resiliencia ante errores de API

El sistema MUST NOT bloquear el guardado del post si la llamada a Meta Graph API falla.

#### Scenario: Error de red o API de Meta

- GIVEN credenciales configuradas y post con algún flag activo
- WHEN la llamada a Meta Graph API retorna error (red, token inválido, rate limit)
- THEN el post se guarda correctamente en Payload
- AND el error se loguea en el servidor con detalle del fallo
- AND el usuario NO recibe un error en el panel de admin

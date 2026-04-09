# Delta for Posts Collection

## ADDED Requirements

### Requirement: Campos de cross-posting en Posts

La colección Posts MUST exponer dos campos booleanos en el panel admin: `postToFacebook` y `postToInstagram`.

Estos campos MUST ser visibles únicamente en el panel de administración (no en la API pública). Su valor SHOULD resetearse a `false` tras ejecutar la publicación en redes sociales para evitar re-publicaciones accidentales en ediciones futuras.

#### Scenario: Editor tilda Facebook al crear post

- GIVEN el formulario de creación de post en Payload Admin
- WHEN el editor marca `postToFacebook: true` y guarda
- THEN el hook afterChange recibe el flag activo
- AND dispara la publicación en Facebook

#### Scenario: Editor tilda Instagram sin imagen

- GIVEN el formulario de creación de post sin `featuredImage`
- WHEN el editor marca `postToInstagram: true` y guarda
- THEN el campo se guarda pero no se publica en Instagram
- AND se loguea advertencia de imagen requerida

#### Scenario: Edición posterior no re-publica

- GIVEN un post ya publicado en redes sociales (flags reseteados a false)
- WHEN el editor actualiza el contenido sin tildar los checkboxes
- THEN el sistema NO publica nuevamente en ninguna red social

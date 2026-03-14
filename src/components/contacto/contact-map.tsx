export function ContactMap() {
  return (
    <div className="rounded-xl overflow-hidden border shadow-sm">
      <iframe
        title="Ubicación de Gomez Producciones - Porteña, Córdoba"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13631.77!2d-62.07!3d-31.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cb2e3e3e3e3e3d%3A0x1!2sPor-te%C3%B1a%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="sm:h-[400px]"
      />
    </div>
  );
}

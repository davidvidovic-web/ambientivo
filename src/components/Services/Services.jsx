import { useTranslation } from "react-i18next";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
import "./Services.css";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section className="services">
      <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
        <h2>{t('services.title')}</h2>
        <p>{t('services.description')}</p>
      </ScrollAnimation>

      <div className="services-grid">
        {t('services.items', { returnObjects: true }).map((service, index) => (
          <ScrollAnimation
            key={index}
            animateIn={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
            animateOut={index % 2 === 0 ? "fadeOutLeft" : "fadeOutRight"}
          >
            <div className={`service-item ${index % 2 === 0 ? '' : 'reversed'}`}>
              <div className="service-content">
                <div className="background-text" aria-hidden="true">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
}

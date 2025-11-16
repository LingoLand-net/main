(function(){
  // Black Friday offers config
  // Images live in /assets/img/balckfriday/ (intentional folder name)
  // Maps to temporary Black Friday bundle products in products-data.js
  const OFFERS = [
    {
      id: 'bf-pack1',
      title: 'Pack 1: Triple Course Bundle',
      image: '/assets/img/balckfriday/1.png',
      productId: 'bf-pack1-456'
    },
    {
      id: 'bf-pack2',
      title: 'Pack 2: Ultimate Primary Bundle',
      image: '/assets/img/balckfriday/2.png',
      productId: 'bf-pack2-456-writing'
    },
    {
      id: 'bf-pack3',
      title: 'Pack 3: Grade 9 Essentials',
      image: '/assets/img/balckfriday/3.png',
      productId: 'bf-pack3-9th-combo'
    },
    {
      id: 'bf-pack4',
      title: 'Pack 4: BAC Preparation',
      image: '/assets/img/balckfriday/4.png',
      productId: 'bf-pack4-bac-combo'
    }
  ];

  window.BLACK_FRIDAY_OFFERS = OFFERS;

  // Inject minimal global styles to enable swipeable scrollers on phones
  function ensureBFStyles(){
    const id = 'bf-global-styles';
    if (document.getElementById(id)) return;
    const css = `
      .bf-scroller{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));max-width:1100px;margin:0 auto}
      .bf-card{display:flex;flex-direction:column;height:100%;border-radius:1rem;overflow:hidden;border:2px solid #fde68a;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.06);transition:all .3s ease;text-decoration:none}
      .bf-card:hover{transform:translateY(-4px);box-shadow:0 8px 20px rgba(251,191,36,.2);border-color:#fbbf24}
      .bf-card-img{aspect-ratio:4/3;min-height:clamp(140px,40vw,220px);background:#fef3c7;overflow:hidden;position:relative}
      .bf-card-img>img{width:100%;height:100%;object-fit:contain;display:block}
      .bf-card-title{padding:clamp(.75rem,2vw,1rem);text-align:center;font-size:clamp(.85rem,2vw,.95rem);font-weight:700;color:#0f3d3f;font-family:'Nunito',sans-serif}
      @media (max-width:700px){
        .bf-scroller{display:flex;overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;gap:.75rem;padding-bottom:.25rem}
        .bf-scroller> a{flex:0 0 82%;max-width:82%;scroll-snap-align:center}
        .bf-scroller.bf-scroller--store> a{flex-basis:62%;max-width:62%}
      }
    `;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function makeOfferHref(offer){
    // Redirect to product page for the Black Friday bundle
    return `/Store/product.html?id=${encodeURIComponent(offer.productId)}`;
  }

  function renderLandingSection(){
    const isHome = /\/index\.html$|\/$/i.test(window.location.pathname);
    if(!isHome) return;
    
    // Avoid duplicate injection
    if(document.getElementById('blackfriday-landing')) return;

    const section = document.createElement('section');
    section.id = 'blackfriday-landing';
    section.style.cssText = 'background:#f8fafc; padding:3rem 0; margin:0;';
    section.innerHTML = `
      <div style="max-width:1180px; margin:0 auto; padding:0 clamp(1rem, 4vw, 1.5rem);">
        <div style="text-align:center; margin-bottom:clamp(1.5rem, 4vw, 2.5rem);">
          <span style="display:inline-block; padding:0.5rem 1.25rem; border-radius:9999px; background:#fbbf24; color:#ffffff; font-weight:700; text-transform:uppercase; font-size:0.75rem; box-shadow:0 2px 8px rgba(251,191,36,0.25); margin-bottom:1rem;">🔥 Black Friday Week</span>
          <h2 style="font-size:clamp(1.75rem, 5vw, 2.5rem); font-weight:800; color:#0f3d3f; margin:0.5rem 0; font-family:'Nunito',sans-serif; line-height:1.2;">Special Offers</h2>
          <p style="font-size:clamp(0.9rem, 2vw, 1rem); color:#64748b; max-width:600px; margin:0.5rem auto 0;">Discover our exclusive Black Friday bundles</p>
        </div>
        <div class="bf-scroller bf-scroller--landing">
          ${OFFERS.map(o=>`
            <a href="${makeOfferHref(o)}" title="${o.title}" style="display:block; border-radius:0.75rem; overflow:hidden; border:2px solid #fde68a; background:#ffffff; box-shadow:0 2px 8px rgba(0,0,0,0.08); transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 16px rgba(251,191,36,0.2)';this.style.borderColor='#fbbf24';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)';this.style.borderColor='#fde68a';">
              <img loading="lazy" src="${o.image}" alt="${o.title}" style="width:100%; height:auto; display:block;" onerror="this.parentElement.remove();" />
            </a>
          `).join('')}
        </div>
      </div>
    `;

    // Insert after what-is-lingo-land section for better flow
    const whatIsSection = document.querySelector('.what-is-lingo-land');
    if(whatIsSection && whatIsSection.nextSibling){
      whatIsSection.parentElement.insertBefore(section, whatIsSection.nextSibling);
    } else {
      // Fallback: insert after hero
      const hero = document.querySelector('.hero');
      if(hero && hero.nextSibling){
        hero.parentElement.insertBefore(section, hero.nextSibling);
      }
    }
  }

  function renderStoreBanner(){
    const isStore = /\/Store\/?(index\.html)?$/i.test(window.location.pathname);
    if(!isStore) return;
    
    // Avoid duplicate injection
    if(document.getElementById('blackfriday-store')) return;

    const container = document.querySelector('.store-container');
    if(!container) return;

    const banner = document.createElement('div');
    banner.id = 'blackfriday-store';
    banner.style.cssText = 'margin:0 0 2rem 0;';
    banner.innerHTML = `
      <div style="border-radius:1rem; border:2px solid #fbbf24; background:#fffbeb; padding:clamp(1rem, 2.5vw, 1.5rem); box-shadow:0 4px 16px rgba(251,191,36,0.15);">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; margin-bottom:1rem;">
          <div style="display:flex; align-items:center; gap:0.75rem; color:#92400e; font-weight:700; font-size:clamp(1rem, 2.5vw, 1.125rem); font-family:'Nunito',sans-serif;">
            <span>🔥</span>
            <span>Black Friday Week</span>
          </div>
        </div>
        <div class="bf-scroller bf-scroller--store">
          ${OFFERS.map(o=>`
            <a href="${makeOfferHref(o)}" title="${o.title}" style="display:block; border-radius:0.75rem; overflow:hidden; border:2px solid #fde68a; background:#ffffff; box-shadow:0 2px 8px rgba(0,0,0,0.08); transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 16px rgba(251,191,36,0.2)';this.style.borderColor='#fbbf24';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)';this.style.borderColor='#fde68a';">
              <img loading="lazy" src="${o.image}" alt="${o.title}" style="width:100%; height:auto; display:block;" onerror="this.parentElement.remove();" />
            </a>
          `).join('')}
        </div>
      </div>
    `;

    const anchor = container.querySelector('.store-intro');
    if(anchor && anchor.nextSibling){
      anchor.parentElement.insertBefore(banner, anchor.nextSibling);
    } else {
      container.insertBefore(banner, container.firstChild);
    }
  }

  function init(){
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded', ()=>{
        setTimeout(()=>{
          ensureBFStyles();
          renderLandingSection();
          renderStoreBanner();
        }, 100);
      });
    } else {
      setTimeout(()=>{
        ensureBFStyles();
        renderLandingSection();
        renderStoreBanner();
      }, 100);
    }
  }

  init();
})();

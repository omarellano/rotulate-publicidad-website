/* Galería de trabajos de la portada. Cada clave identifica el mismo archivo
   en assets/galeria y en su carpeta de miniaturas. */
(function () {
    'use strict';
    const grid = document.getElementById('galeria-grid');
    const more = document.getElementById('btn-reload-galeria');
    const filters = document.querySelectorAll('.galeria-filtro');
    // Por foto: [producto o servicio cotizable, descripción visual para accesibilidad].
    const catalog = {
        vehicular: {
            38: ['Rotulación publicitaria de combis', 'Combi oscura con franja roja'],
            39: ['Rotulación publicitaria de combis', 'Combi turquesa con ilustración lateral'],
            44: ['Rotulación de cajas de camión', 'Camión blanco con gráfica en la caja'],
            45: ['Rotulación de camionetas de reparto', 'Camioneta de reparto con escudo en la puerta'],
            46: ['Rotulación de puertas de carga', 'Puertas traseras rotuladas de un camión'],
            47: ['Rotulación de camionetas de reparto', 'Vista lateral de una camioneta de reparto'],
            48: ['Rotulación de cabinas de camión', 'Frente rotulado de un camión blanco'],
            74: ['Rotulación publicitaria de cajas de carga', 'Gráfica verde en una caja de carga'],
            75: ['Rotulación de camiones de reparto', 'Camión de reparto con gráfica de frutas'],
            76: ['Rotulación de flotillas de servicio', 'Camión de limpia con ilustración en la caja'],
            77: ['Rotulación de camiones de reparto', 'Gráfica de frutas en la parte trasera del camión'],
            112: ['Rotulación publicitaria de medallón', 'Medallón rotulado de un auto azul'],
            113: ['Rotulación vehicular de cofre', 'Vista frontal de un auto con capó azul'],
            114: ['Rotulación de flotilla comercial', 'Perfil de auto blanco con gráfica azul'],
            118: ['Forrado integral en vinil para flotillas', 'Puerta rotulada de un auto rosa'],
            119: ['Forrado integral en vinil para flotillas', 'Vista lateral de un auto rosa'],
            120: ['Forrado integral en vinil para flotillas', 'Frente y costado de un auto rosa'],
            126: ['Rotulación de embarcaciones turísticas', 'Emblema en el casco de una lancha'],
            127: ['Rotulación de embarcaciones turísticas', 'Vista lateral de una lancha rotulada'],
            134: ['Rotulación industrial de tanques', 'Detalle del rótulo en un tanque de cemento'],
            135: ['Rotulación industrial de tanques', 'Vista lateral del tanque de cemento rotulado'],
            136: ['Rotulación publicitaria de camiones de reparto', 'Camión de reparto con caja verde'],
            140: ['Rotulación de ollas revolvedoras', 'Rótulo en la olla de una revolvedora'],
            142: ['Rotulación de camiones revolvedores', 'Vista completa de un camión revolvedor'],
        },
        anuncios: {
            4: ['Letras 3D para acceso residencial', 'Letras en el muro blanco de un acceso'],
            5: ['Logotipo en letras 3D', 'Detalle de letras con relieve sobre madera'],
            6: ['Letrero de identificación para fachada', 'Placa azul en un muro de entrada'],
            8: ['Rótulo de marca para estacionamiento', 'Letrero amarillo con letras negras'],
            9: ['Logotipo y letras 3D para interiores', 'Letras metálicas en un muro interior'],
            11: ['Letras 3D para fachada comercial', 'Letrero azul sobre fachada acanalada'],
            12: ['Señalética de prohibición para exteriores', 'Señales de prohibición en un sendero'],
            13: ['Anuncio luminoso para restaurante', 'Letrero ilustrado con luces en el borde'],
            14: ['Letras 3D para local comercial', 'Letras naranjas sobre un acceso comercial'],
            15: ['Logotipo luminoso para recepción', 'Logotipo iluminado sobre un muro rojo'],
            17: ['Anuncio de marca en relieve', 'Letrero azul de esquinas redondeadas'],
            18: ['Rótulo comercial para módulo de venta', 'Letras sobre el acceso a un módulo comercial'],
            19: ['Letrero publicitario para punto de venta', 'Letrero azul con gráficos amarillos y blancos'],
            20: ['Letrero de identificación comercial', 'Letrero sobre un escaparate de vidrio'],
            32: ['Rótulo de fachada para local comercial', 'Rótulos sobre la entrada de un negocio'],
            33: ['Anuncio circular para punto de venta', 'Detalle de letrero circular multicolor'],
            34: ['Letrero circular para restaurante', 'Letrero circular negro con letras amarillas'],
            35: ['Letras y logotipo en relieve', 'Detalle de letras blancas sobre fondo rojo'],
            36: ['Anuncio elevado para restaurante', 'Anuncio elevado junto al agua al atardecer'],
            40: ['Letras monumentales para destinos turísticos', 'Letras multicolor de Cancún frente al mar'],
            41: ['Letras monumentales para destinos turísticos', 'Vista lateral de las letras de Cancún'],
            56: ['Anuncio comercial en poste', 'Anuncio sobre poste junto a la carretera'],
            58: ['Letrero de neón con frase personalizada', 'Frase en neón azul sobre un muro oscuro'],
            61: ['Letrero de fachada para tienda de pinturas', 'Letrero azul sobre una cortina cerrada'],
            62: ['Letrero de fachada para tienda de pinturas', 'Anuncio de tienda sobre el acceso abierto'],
            66: ['Paneles luminosos decorativos', 'Paneles verticales iluminados en un interior'],
            68: ['Letras monumentales iluminadas', 'Detalle de letras de colores iluminadas de noche'],
            69: ['Letras monumentales iluminadas', 'Vista completa del letrero iluminado de Cancún'],
            72: ['Anuncio de fachada para restaurante', 'Anuncio azul sobre la entrada de una pizzería'],
            78: ['Placa de identificación con letras en relieve', 'Placa verde con letras en relieve'],
            79: ['Letreros circulares de neón', 'Dos letreros circulares de neón'],
            81: ['Anuncio luminoso para fachada comercial', 'Letrero de tienda de pinturas de día'],
            82: ['Anuncio luminoso para fachada comercial', 'Letrero de tienda de pinturas iluminado de noche'],
            86: ['Letras 3D luminosas para fachada', 'Letras en relieve sobre una fachada azul'],
            87: ['Letras 3D luminosas para fachada', 'Letras amarillas iluminadas de noche'],
            91: ['Anuncio luminoso para restaurante', 'Letrero de restaurante sobre duela'],
            95: ['Rótulo de fachada para comercio', 'Rótulo azul sobre el frente de una tienda'],
            96: ['Placas de señalización para sanitarios', 'Placas con pictogramas de sanitarios'],
            97: ['Señalética suspendida de evacuación', 'Señal suspendida de salida de emergencia'],
            98: ['Directorio y señalética de orientación', 'Directorio con flechas y pictogramas'],
            99: ['Anuncio luminoso para restaurante', 'Detalle del letrero ilustrado sobre duela'],
            100: ['Directorio comercial en poste', 'Directorio de negocios junto a la calle'],
            102: ['Letrero para consultorio dental', 'Letrero con silueta de diente'],
            104: ['Letrero luminoso con letras de canal', 'Logotipo sobre el área de mostrador'],
            108: ['Figura de neón LED para eventos', 'Silueta de neón en azul y rosa'],
            109: ['Rotulación luminosa para escenografía', 'Mostrador curvo con letras iluminadas'],
            110: ['Escenografía LED para evento corporativo', 'Escalones iluminados frente a un escenario'],
            111: ['Figura de neón LED para eventos', 'Contorno azul de un rostro en exhibición'],
            128: ['Estructura para tótem de gasolinera', 'Montaje de estructura para un anuncio elevado'],
            129: ['Tótem de alucobond para gasolinera', 'Directorio vertical con estructura verde'],
            131: ['Tótem de alucobond para gasolinera', 'Directorio comercial durante su instalación'],
            133: ['Letrero luminoso para heladería', 'Letrero de heladería sobre listones de madera'],
            137: ['Letrero decorativo para exteriores', 'Letrero decorativo junto a vegetación'],
            138: ['Anuncio elevado para tienda de pinturas', 'Anuncio elevado de tienda de pinturas'],
            143: ['Letras luminosas para interiores', 'Letras turquesa iluminadas en un interior'],
        },
        impresion: {
            1: ['Rotulación decorativa de accesos', 'Gráfica de arco alrededor de una puerta'],
            2: ['Rotulación decorativa de accesos', 'Detalle de la gráfica en el marco de una puerta'],
            3: ['Isla de exhibición para punto de venta', 'Módulo de exhibición en una plaza comercial'],
            7: ['Impresión de gran formato para eventos', 'Montaje de un panel gráfico para evento'],
            10: ['Letras monumentales para activaciones', 'Exhibición roja con letras monumentales'],
            16: ['Rotulación de muros de oficina', 'Gráfica de pared en un área de trabajo'],
            21: ['Mostrador promocional con cabecera', 'Módulo promocional con cabecera y frente impreso'],
            22: ['Mostrador promocional con cabecera', 'Parte trasera de un módulo promocional'],
            23: ['Mostrador rotulado para activaciones', 'Mostrador gráfico en una activación'],
            24: ['Rotulación publicitaria de escaparates', 'Gráfica fotográfica en un escaparate'],
            25: ['Rotulación de portones de acceso', 'Gráfica sobre el cerramiento de un acceso'],
            26: ['Rotulación de mesas para eventos', 'Gráfica impresa a lo largo de una mesa'],
            28: ['Rotulación de vidrieras comerciales', 'Gráficos sobre ventanas de un negocio'],
            29: ['Muro de prensa con logotipos', 'Fondo blanco con logotipos multicolor'],
            30: ['Muro de prensa con logotipos', 'Vista lateral de un fondo para fotografías'],
            37: ['Rotulación de carritos promocionales', 'Carrito de exhibición con cubierta azul impresa'],
            49: ['Panel publicitario para eventos', 'Panel impreso para un evento en Cancún'],
            53: ['Etiquetas impresas en planilla', 'Planilla de etiquetas circulares'],
            54: ['Impresión de gráficos promocionales', 'Detalle de un gráfico circular impreso'],
            55: ['Etiquetas impresas para promoción', 'Muestra circular junto a una planilla de etiquetas'],
            57: ['Rotulación de mostradores comerciales', 'Gráfica verde y rosa para un mostrador'],
            64: ['Banner enrollable tipo roll-up', 'Banner vertical junto a un muro verde'],
            65: ['Rotulación de muros con imagen corporativa', 'Muro rosa con gráfica geométrica'],
            67: ['Rotulación de ventanales comerciales', 'Gráfica azul en ventanales a nivel de calle'],
            70: ['Rotulación de ventanales comerciales', 'Gráficos azules en una hilera de ventanas'],
            71: ['Impresión de gran formato para escaparates', 'Gráfica de gran formato en un ventanal con arco'],
            73: ['Lona publicitaria impresa', 'Lona con texto rojo y azul desplegada en el piso'],
            83: ['Playera promocional estampada', 'Playera negra con estampado publicitario'],
            84: ['Lonas publicitarias para rejas', 'Lonas azules en una reja de acceso'],
            85: ['Lonas publicitarias para rejas', 'Vista lateral de las lonas en la reja'],
            88: ['Rotulación decorativa de muros', 'Gráfica de pared con retrato y texto'],
            89: ['Rotulación de muros con frases corporativas', 'Mensaje tipográfico sobre un muro blanco'],
            90: ['Película de privacidad para divisiones de vidrio', 'Gráfica de privacidad en una división de vidrio'],
            101: ['Botarga promocional personalizada', 'Botarga de oso para una activación'],
            105: ['Exhibidor de lentes para punto de venta', 'Exhibidor rojo y blanco de frente'],
            106: ['Exhibidor de lentes para punto de venta', 'Vista lateral del exhibidor rojo y blanco'],
            107: ['Vinil microperforado para puertas de vidrio', 'Gráfica de producto sobre puertas de vidrio'],
            141: ['Lona publicitaria para fachada', 'Lona publicitaria sobre una fachada'],
            145: ['Lonas perimetrales para obra', 'Lonas verdes en un cerramiento de obra'],
            146: ['Rotulación de módulos de registro', 'Módulos de registro con gráfica de congreso'],
            147: ['Arco de bienvenida para congreso', 'Arco de entrada a un congreso'],
            148: ['Muro de patrocinadores para congreso', 'Panel de patrocinadores para un congreso'],
            149: ['Stand publicitario para exposición', 'Stand con pantallas y gráfica impresa'],
            150: ['Rotulación de vallas de obra', 'Gráfica del Tren Maya en vallas del AIFA'],
        },
        fachadas: {
            27: ['Imagen de fachada comercial', 'Fachada azul en esquina'],
            59: ['Rotulación de cortinas metálicas', 'Cortina blanca rotulada con dos marcas'],
            60: ['Rotulación de cortinas metálicas', 'Cortina azul y blanca con logotipos'],
            63: ['Rotulación institucional en barda', 'Escudo y letras en el muro de acceso'],
            80: ['Toldo publicitario para tienda de pinturas', 'Fachada de tienda de pinturas con toldo rojo'],
            92: ['Rotulación de fachada y cortinas metálicas', 'Frente de tienda con rótulos y cortinas rojas'],
            93: ['Rotulación de cortinas metálicas', 'Cortinas con diseño geométrico azul y verde'],
            94: ['Rotulación de cortinas metálicas', 'Detalle de cortina rotulada en rojo'],
            103: ['Toldo para acceso comercial', 'Toldo color vino sobre una entrada'],
            115: ['Toldo publicitario para tienda de abarrotes', 'Franja azul en una fachada de dos niveles'],
            116: ['Toldo publicitario para papelería', 'Fachada azul con rótulos blancos'],
            130: ['Revestimiento de alucobond para marquesinas', 'Vista panorámica de cubiertas de gasolinera'],
            132: ['Revestimiento de alucobond para marquesinas', 'Cubierta de gasolinera vista desde el acceso'],
            139: ['Rotulación industrial de silos', 'Rotulación de un silo blanco'],
            144: ['Rotulación industrial de silos', 'Silo rotulado e iluminado al anochecer'],
        },
    };

    const photos = Object.entries(catalog).flatMap(([category, entries]) =>
        Object.entries(entries).map(([id, [title, description]]) => ({
            category, title, description, file: 'galeria-' + id.padStart(3, '0') + '.webp'
        }))
    );

    // Se baraja una vez por visita. Los filtros conservan ese orden.
    for (let i = photos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [photos[i], photos[j]] = [photos[j], photos[i]];
    }

    let selection = photos;
    let shown = 0;
    function showMore(moveFocus) {
        const batch = selection.slice(shown, shown + 12);
        const fragment = document.createDocumentFragment();
        for (const photo of batch) {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'galeria-item';
            card.setAttribute('aria-label', 'Ampliar foto: ' + photo.title + '. ' + photo.description);
            const img = document.createElement('img');
            img.src = 'assets/galeria/thumbs/' + photo.file;
            img.alt = photo.description;
            img.loading = 'lazy';
            const caption = document.createElement('span');
            caption.className = 'galeria-label';
            caption.textContent = photo.title;
            card.append(img, caption);
            fragment.append(card);
        }
        const firstNew = fragment.firstElementChild;
        grid.append(fragment);
        shown += batch.length;
        more.hidden = shown === selection.length;
        if (moveFocus && firstNew) firstNew.focus();
    }

    more.addEventListener('click', () => showMore(true));
    for (const filter of filters) {
        filter.addEventListener('click', () => {
            if (filter.getAttribute('aria-pressed') === 'true') return;
            for (const button of filters) {
                button.setAttribute('aria-pressed', String(button === filter));
            }
            const category = filter.dataset.cat;
            selection = category === 'todos' ? photos : photos.filter(p => p.category === category);
            grid.replaceChildren();
            shown = 0;
            showMore(false);
        });
    }
    showMore(false);
})();

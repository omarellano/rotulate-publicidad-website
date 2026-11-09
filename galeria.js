/* Galería de trabajos de la portada. Cada clave identifica el mismo archivo
   en assets/galeria y en su carpeta de miniaturas. */
(function () {
    'use strict';
    const grid = document.getElementById('galeria-grid');
    const more = document.getElementById('btn-reload-galeria');
    const filters = document.querySelectorAll('.galeria-filtro');
    const catalog = {
        vehicular: {
            38: 'Combi oscura con franja roja',
            39: 'Combi turquesa con ilustración lateral',
            44: 'Camión blanco con gráfica en la caja',
            45: 'Camioneta de reparto con escudo en la puerta',
            46: 'Puertas traseras rotuladas de un camión',
            47: 'Vista lateral de una camioneta de reparto',
            48: 'Frente rotulado de un camión blanco',
            74: 'Gráfica verde en una caja de carga',
            75: 'Camión de reparto con gráfica de frutas',
            76: 'Camión de limpia con ilustración en la caja',
            77: 'Gráfica de frutas en la parte trasera del camión',
            112: 'Medallón rotulado de un auto azul',
            113: 'Vista frontal de un auto con capó azul',
            114: 'Perfil de auto blanco con gráfica azul',
            118: 'Puerta rotulada de un auto rosa',
            119: 'Vista lateral de un auto rosa',
            120: 'Frente y costado de un auto rosa',
            126: 'Emblema en el casco de una lancha',
            127: 'Vista lateral de una lancha rotulada',
            134: 'Detalle del rótulo en un tanque de cemento',
            135: 'Vista lateral del tanque de cemento rotulado',
            136: 'Camión de reparto con caja verde',
            140: 'Rótulo en la olla de una revolvedora',
            142: 'Vista completa de un camión revolvedor',
        },
        anuncios: {
            4: 'Letras en el muro blanco de un acceso',
            5: 'Detalle de letras con relieve sobre madera',
            6: 'Placa azul en un muro de entrada',
            8: 'Letrero amarillo con letras negras',
            9: 'Letras metálicas en un muro interior',
            11: 'Letrero azul sobre fachada acanalada',
            12: 'Señales de prohibición en un sendero',
            13: 'Letrero ilustrado con luces en el borde',
            14: 'Letras naranjas sobre un acceso comercial',
            15: 'Logotipo iluminado sobre un muro rojo',
            17: 'Letrero azul de esquinas redondeadas',
            18: 'Letras sobre el acceso a un módulo comercial',
            19: 'Letrero azul con gráficos amarillos y blancos',
            20: 'Letrero sobre un escaparate de vidrio',
            32: 'Rótulos sobre la entrada de un negocio',
            33: 'Detalle de letrero circular multicolor',
            34: 'Letrero circular negro con letras amarillas',
            35: 'Detalle de letras blancas sobre fondo rojo',
            36: 'Anuncio elevado junto al agua al atardecer',
            40: 'Letras multicolor de Cancún frente al mar',
            41: 'Vista lateral de las letras de Cancún',
            56: 'Anuncio sobre poste junto a la carretera',
            58: 'Frase en neón azul sobre un muro oscuro',
            61: 'Letrero azul sobre una cortina cerrada',
            62: 'Anuncio de tienda sobre el acceso abierto',
            66: 'Paneles verticales iluminados en un interior',
            68: 'Detalle de letras de colores iluminadas de noche',
            69: 'Vista completa del letrero iluminado de Cancún',
            72: 'Anuncio azul sobre la entrada de una pizzería',
            78: 'Placa verde con letras en relieve',
            79: 'Dos letreros circulares de neón',
            81: 'Letrero de tienda de pinturas de día',
            82: 'Letrero de tienda de pinturas iluminado de noche',
            86: 'Letras en relieve sobre una fachada azul',
            87: 'Letras amarillas iluminadas de noche',
            91: 'Letrero de restaurante sobre duela',
            95: 'Rótulo azul sobre el frente de una tienda',
            96: 'Placas con pictogramas de sanitarios',
            97: 'Señal suspendida de salida de emergencia',
            98: 'Directorio con flechas y pictogramas',
            99: 'Detalle del letrero ilustrado sobre duela',
            100: 'Directorio de negocios junto a la calle',
            102: 'Letrero con silueta de diente',
            104: 'Logotipo sobre el área de mostrador',
            108: 'Silueta de neón en azul y rosa',
            109: 'Mostrador curvo con letras iluminadas',
            110: 'Escalones iluminados frente a un escenario',
            111: 'Contorno azul de un rostro en exhibición',
            128: 'Montaje de estructura para un anuncio elevado',
            129: 'Directorio vertical con estructura verde',
            131: 'Directorio comercial durante su instalación',
            133: 'Letrero de heladería sobre listones de madera',
            137: 'Letrero decorativo junto a vegetación',
            138: 'Anuncio elevado de tienda de pinturas',
            143: 'Letras turquesa iluminadas en un interior',
        },
        impresion: {
            1: 'Gráfica de arco alrededor de una puerta',
            2: 'Detalle de la gráfica en el marco de una puerta',
            3: 'Módulo de exhibición en una plaza comercial',
            7: 'Montaje de un panel gráfico para evento',
            10: 'Exhibición roja con letras monumentales',
            16: 'Gráfica de pared en un área de trabajo',
            21: 'Módulo promocional con cabecera y frente impreso',
            22: 'Parte trasera de un módulo promocional',
            23: 'Mostrador gráfico en una activación',
            24: 'Gráfica fotográfica en un escaparate',
            25: 'Gráfica sobre el cerramiento de un acceso',
            26: 'Gráfica impresa a lo largo de una mesa',
            28: 'Gráficos sobre ventanas de un negocio',
            29: 'Fondo blanco con logotipos multicolor',
            30: 'Vista lateral de un fondo para fotografías',
            37: 'Carrito de exhibición con cubierta azul impresa',
            49: 'Panel impreso para un evento en Cancún',
            53: 'Planilla de etiquetas circulares',
            54: 'Detalle de un gráfico circular impreso',
            55: 'Muestra circular junto a una planilla de etiquetas',
            57: 'Gráfica verde y rosa para un mostrador',
            64: 'Banner vertical junto a un muro verde',
            65: 'Muro rosa con gráfica geométrica',
            67: 'Gráfica azul en ventanales a nivel de calle',
            70: 'Gráficos azules en una hilera de ventanas',
            71: 'Gráfica de gran formato en un ventanal con arco',
            73: 'Lona con texto rojo y azul desplegada en el piso',
            83: 'Playera negra con estampado publicitario',
            84: 'Lonas azules en una reja de acceso',
            85: 'Vista lateral de las lonas en la reja',
            88: 'Gráfica de pared con retrato y texto',
            89: 'Mensaje tipográfico sobre un muro blanco',
            90: 'Gráfica de privacidad en una división de vidrio',
            101: 'Botarga de oso para una activación',
            105: 'Exhibidor rojo y blanco de frente',
            106: 'Vista lateral del exhibidor rojo y blanco',
            107: 'Gráfica de producto sobre puertas de vidrio',
            141: 'Lona publicitaria sobre una fachada',
            145: 'Lonas verdes en un cerramiento de obra',
            146: 'Módulos de registro con gráfica de congreso',
            147: 'Arco de entrada a un congreso',
            148: 'Panel de patrocinadores para un congreso',
            149: 'Stand con pantallas y gráfica impresa',
            150: 'Gráfica del Tren Maya en vallas del AIFA',
        },
        fachadas: {
            27: 'Fachada azul en esquina',
            59: 'Cortina blanca rotulada con dos marcas',
            60: 'Cortina azul y blanca con logotipos',
            63: 'Escudo y letras en el muro de acceso',
            80: 'Fachada de tienda de pinturas con toldo rojo',
            92: 'Frente de tienda con rótulos y cortinas rojas',
            93: 'Cortinas con diseño geométrico azul y verde',
            94: 'Detalle de cortina rotulada en rojo',
            103: 'Toldo color vino sobre una entrada',
            115: 'Franja azul en una fachada de dos niveles',
            116: 'Fachada azul con rótulos blancos',
            130: 'Vista panorámica de cubiertas de gasolinera',
            132: 'Cubierta de gasolinera vista desde el acceso',
            139: 'Rotulación de un silo blanco',
            144: 'Silo rotulado e iluminado al anochecer',
        },
    };

    const photos = Object.entries(catalog).flatMap(([category, titles]) =>
        Object.entries(titles).map(([id, title]) => ({
            category, title, file: 'galeria-' + id.padStart(3, '0') + '.webp'
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
            card.setAttribute('aria-label', 'Ampliar foto: ' + photo.title);
            const img = document.createElement('img');
            img.src = 'assets/galeria/thumbs/' + photo.file;
            img.alt = photo.title;
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

/**
 * @load {product}
 */
INSERT INTO [functional].[product]
([name], [description], [category], [price], [originalPrice], [imageUrl], [status], [featured], [dateCreated])
VALUES
('Sofá Retrátil Premium', 'Sofá retrátil de 3 lugares com tecido suede, estrutura em madeira maciça e sistema de reclinação', 'Sala de Estar', 2890.00, NULL, '/images/sofa-retratil-premium.jpg', 0, 1, DATEADD(DAY, -5, GETUTCDATE())),
('Mesa de Jantar Elegance', 'Mesa de jantar para 6 pessoas em madeira nobre com acabamento laqueado', 'Sala de Jantar', 1650.00, 1950.00, '/images/mesa-jantar-elegance.jpg', 0, 1, DATEADD(DAY, -10, GETUTCDATE())),
('Guarda-Roupa Casal Moderno', 'Guarda-roupa de 6 portas com espelho, gavetas e prateleiras internas', 'Quarto', 1890.00, NULL, '/images/guarda-roupa-moderno.jpg', 0, 0, DATEADD(DAY, -15, GETUTCDATE())),
('Rack para TV Suspenso', 'Rack suspenso para TV até 65 polegadas com nichos e gavetas', 'Sala de Estar', 890.00, 1090.00, '/images/rack-tv-suspenso.jpg', 0, 0, DATEADD(DAY, -20, GETUTCDATE())),
('Cama Box Queen Size', 'Cama box queen size com colchão de molas ensacadas e pillow top', 'Quarto', 2450.00, NULL, '/images/cama-box-queen.jpg', 0, 1, DATEADD(DAY, -3, GETUTCDATE())),
('Aparador Buffet Clássico', 'Aparador buffet com 3 portas e 2 gavetas em madeira maciça', 'Sala de Jantar', 1290.00, NULL, '/images/aparador-buffet.jpg', 0, 0, DATEADD(DAY, -25, GETUTCDATE())),
('Poltrona Decorativa', 'Poltrona decorativa com pés palito e estofado em veludo', 'Sala de Estar', 690.00, 890.00, '/images/poltrona-decorativa.jpg', 0, 0, DATEADD(DAY, -30, GETUTCDATE())),
('Escrivaninha Home Office', 'Escrivaninha compacta com gavetas e suporte para CPU', 'Escritório', 580.00, NULL, '/images/escrivaninha-home-office.jpg', 0, 0, DATEADD(DAY, -35, GETUTCDATE())),
('Cadeira Presidente Executiva', 'Cadeira presidente com encosto alto, apoio lombar e braços reguláveis', 'Escritório', 890.00, NULL, '/images/cadeira-presidente.jpg', 0, 0, DATEADD(DAY, -40, GETUTCDATE())),
('Cristaleira Vitrine', 'Cristaleira vitrine com portas de vidro e iluminação LED interna', 'Sala de Jantar', 1450.00, 1650.00, '/images/cristaleira-vitrine.jpg', 0, 0, DATEADD(DAY, -45, GETUTCDATE())),
('Cômoda 5 Gavetas', 'Cômoda com 5 gavetas espaçosas e puxadores metálicos', 'Quarto', 790.00, NULL, '/images/comoda-5-gavetas.jpg', 0, 0, DATEADD(DAY, -50, GETUTCDATE())),
('Estante para Livros', 'Estante modular para livros com 5 prateleiras ajustáveis', 'Escritório', 650.00, NULL, '/images/estante-livros.jpg', 0, 0, DATEADD(DAY, -55, GETUTCDATE())),
('Mesa de Centro Redonda', 'Mesa de centro redonda com tampo de vidro e base em metal', 'Sala de Estar', 490.00, 590.00, '/images/mesa-centro-redonda.jpg', 0, 0, DATEADD(DAY, -60, GETUTCDATE())),
('Cabeceira Estofada King', 'Cabeceira estofada king size com capitonê e tecido suede', 'Quarto', 890.00, NULL, '/images/cabeceira-estofada-king.jpg', 0, 0, DATEADD(DAY, -65, GETUTCDATE())),
('Balcão de Cozinha', 'Balcão de cozinha com portas, gavetas e tampo em granito sintético', 'Cozinha', 1290.00, NULL, '/images/balcao-cozinha.jpg', 0, 0, DATEADD(DAY, -70, GETUTCDATE())),
('Conjunto de Cadeiras', 'Conjunto com 4 cadeiras estofadas para sala de jantar', 'Sala de Jantar', 890.00, 1090.00, '/images/conjunto-cadeiras.jpg', 0, 0, DATEADD(DAY, -75, GETUTCDATE())),
('Sapateira Organizadora', 'Sapateira com 3 portas basculantes para até 18 pares', 'Quarto', 390.00, NULL, '/images/sapateira-organizadora.jpg', 0, 0, DATEADD(DAY, -80, GETUTCDATE())),
('Banco Baú Multiuso', 'Banco baú estofado com compartimento interno para armazenamento', 'Sala de Estar', 290.00, NULL, '/images/banco-bau-multiuso.jpg', 0, 0, DATEADD(DAY, -85, GETUTCDATE())),
('Painel para TV Grande', 'Painel para TV até 75 polegadas com prateleiras e LED', 'Sala de Estar', 1590.00, 1890.00, '/images/painel-tv-grande.jpg', 0, 1, DATEADD(DAY, -2, GETUTCDATE())),
('Mesa Lateral Decorativa', 'Mesa lateral decorativa com design moderno e acabamento laqueado', 'Sala de Estar', 390.00, NULL, '/images/mesa-lateral-decorativa.jpg', 0, 0, DATEADD(DAY, -90, GETUTCDATE()));
GO
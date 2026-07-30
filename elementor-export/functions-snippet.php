<?php
/**
 * ============================================================
 * ESCOLA DE SOLDA NO JAPÃO — Snippet para functions.php
 * ============================================================
 * 
 * INSTRUÇÕES:
 * 1. Crie um tema filho (Child Theme) se ainda não tiver um
 * 2. Cole todo este código no arquivo functions.php do tema filho
 * 3. Faça upload dos arquivos CSS e JS via FTP/File Manager:
 *    - /wp-content/themes/SEU-TEMA-FILHO/css/elementor-custom.css
 *    - /wp-content/themes/SEU-TEMA-FILHO/js/elementor-custom.js
 * 4. Substitua 'SEU-TEMA-FILHO' pelo slug correto do seu tema
 * 
 * ALTERNATIVA (sem tema filho):
 * Use o plugin "Code Snippets" para adicionar este código
 * sem modificar arquivos do tema.
 * ============================================================
 */

/**
 * 1. Enfileirar CSS e JS personalizados da landing page
 */
add_action('wp_enqueue_scripts', function () {
    // Verificar se estamos na página da landing page
    // Método 1: Por slug da página
    if (is_page('landing-solda') || is_page('escola-de-solda') || is_front_page()) {

        // Google Fonts (caso o tema não carregue automaticamente)
        wp_enqueue_style(
            'esj-google-fonts',
            'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300..900;1,300..900&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
            [],
            null
        );

        // CSS Personalizado
        wp_enqueue_style(
            'esj-custom-styles',
            get_stylesheet_directory_uri() . '/css/elementor-custom.css',
            ['elementor-frontend'],
            '1.0.0'
        );

        // JavaScript Personalizado (carregado no footer)
        wp_enqueue_script(
            'esj-custom-scripts',
            get_stylesheet_directory_uri() . '/js/elementor-custom.js',
            ['jquery'],
            '1.0.0',
            true // Carregar no footer
        );
    }
}, 20); // Prioridade 20 para carregar depois do Elementor


/**
 * 2. Permitir SVGs no upload da Media Library (opcional)
 * Útil para ícones personalizados
 */
add_filter('upload_mimes', function ($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
});


/**
 * 3. Remover a barra de admin do WordPress no frontend
 * Evita que a barra de 32px quebre o layout da LP
 */
add_action('wp_loaded', function () {
    if (!is_admin() && !current_user_can('manage_options')) {
        show_admin_bar(false);
    }
});


/**
 * 4. Hook para processar dados do formulário Elementor
 * Intercepta o envio do formulário para salvar no banco ou enviar via API
 */
add_action('elementor_pro/forms/new_record', function ($record, $handler) {
    // Obter o nome do formulário
    $form_name = $record->get_form_settings('form_name');
    
    // Processar apenas formulários da escola de solda
    if ($form_name !== 'escola_solda_lead_capture') {
        return;
    }

    // Obter dados formatados do formulário
    $raw_fields = $record->get('fields');
    $fields = [];
    foreach ($raw_fields as $id => $field) {
        $fields[$id] = $field['value'];
    }

    // Aqui você pode:
    // 1. Salvar em uma tabela customizada do WP
    // 2. Enviar para um CRM via API
    // 3. Enviar para Google Sheets via webhook
    // 4. Salvar como Custom Post Type

    // Exemplo: Salvar como post do tipo 'esj_lead'
    $lead_post = array(
        'post_title'   => sanitize_text_field($fields['name'] ?? 'Lead sem nome'),
        'post_content' => wp_json_encode($fields),
        'post_status'  => 'private',
        'post_type'    => 'esj_lead',
    );

    $post_id = wp_insert_post($lead_post);

    if ($post_id && !is_wp_error($post_id)) {
        // Salvar campos como meta do post
        foreach ($fields as $key => $value) {
            update_post_meta($post_id, '_esj_' . $key, sanitize_text_field($value));
        }
    }

}, 10, 2);


/**
 * 5. Registrar Custom Post Type para Leads (opcional)
 * Permite visualizar leads diretamente no WP-Admin
 */
add_action('init', function () {
    register_post_type('esj_lead', [
        'labels' => [
            'name'          => 'Leads Escola Solda',
            'singular_name' => 'Lead',
            'menu_name'     => 'Leads',
            'all_items'     => 'Todos os Leads',
            'add_new'       => 'Novo Lead',
            'add_new_item'  => 'Adicionar Novo Lead',
            'edit_item'     => 'Editar Lead',
            'view_item'     => 'Ver Lead',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => true,
        'menu_icon'    => 'dashicons-groups',
        'supports'     => ['title', 'custom-fields'],
        'capability_type' => 'post',
    ]);
});


/**
 * 6. Adicionar colunas customizadas na listagem de Leads no admin
 */
add_filter('manage_esj_lead_posts_columns', function ($columns) {
    $new_columns = [];
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = 'Nome';
    $new_columns['esj_whatsapp'] = 'WhatsApp';
    $new_columns['esj_province'] = 'Província';
    $new_columns['esj_job'] = 'Setor Atual';
    $new_columns['esj_time'] = 'Tempo JP';
    $new_columns['date'] = 'Data';
    return $new_columns;
});

add_action('manage_esj_lead_posts_custom_column', function ($column, $post_id) {
    switch ($column) {
        case 'esj_whatsapp':
            echo esc_html(get_post_meta($post_id, '_esj_whatsapp', true));
            break;
        case 'esj_province':
            echo esc_html(get_post_meta($post_id, '_esj_province', true));
            break;
        case 'esj_job':
            echo esc_html(get_post_meta($post_id, '_esj_currentJob', true));
            break;
        case 'esj_time':
            echo esc_html(get_post_meta($post_id, '_esj_timeInJapan', true));
            break;
    }
}, 10, 2);


/**
 * 7. Adicionar meta description para SEO (caso não use plugin de SEO)
 */
add_action('wp_head', function () {
    if (is_page('landing-solda') || is_page('escola-de-solda') || is_front_page()) {
        echo '<meta name="description" content="Escola de Solda no Japão — Treinamento prático de soldagem TIG, MIG/MAG e Eletrodo 100% em português. Aulas aos finais de semana. Conquiste salários de até ¥2.500/hora como soldador profissional certificado JWES.">' . "\n";
        echo '<meta name="keywords" content="escola de solda japão, curso soldagem japão, soldador profissional japão, JWES, TIG MIG MAG, brasileiros no japão, dekassegui">' . "\n";
        echo '<meta property="og:title" content="Escola de Solda no Japão — Torne-se um Soldador Profissional">' . "\n";
        echo '<meta property="og:description" content="Mude de vida no Japão: treinamento prático de soldagem com aulas 100% em português. Conquiste salários de até ¥2.500/hora.">' . "\n";
        echo '<meta property="og:type" content="website">' . "\n";
    }
});

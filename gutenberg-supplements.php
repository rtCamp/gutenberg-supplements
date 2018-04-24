<?php
/**
 * Plugin Name: Gutenberg Supplements
 * Description:  Gutenberg Supplements
 * Author: rtCamp, sagarkbhatt, sayedwp, manishsongirkar36, yahil
 * Author URI: https://rtcamp.com/
 * Version: 0.1
 * License: GPLv2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: gutenberg-supplements
 *
 * @package rtBlocks
 */

if ( ! defined( 'RT_GS_VER' ) ) {
	define( 'RT_GS_VER', '0.1' );
}

if ( ! defined( 'RT_GS_DIR' ) ) {
	define( 'RT_GS_DIR', __DIR__ );
}

if ( ! defined( 'RT_GS_DIR_URL' ) ) {
	define( 'RT_GS_DIR_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'RT_GS_DIR_PATH' ) ) {
	define( 'RT_GS_DIR_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

if ( ! function_exists( 'is_plugin_active' ) ) {
	include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
}

if ( ! is_plugin_active( 'gutenberg-fields-middleware/gutenberg-fields-middleware.php' ) ) {

	add_action( 'admin_notices', function() {
		printf(
			__( '<div class="error"><p>Gutenberg Supplements plugin require <a href="%s" title="Gutenberg Fields Middleware" target="_blank">Gutenberg Fields Middleware</a> plugin.</p></div>', 'gutenberg-supplements' ),
			__( 'https://github.com/rtCamp/gutenberg-fields-middleware' )
		);

		deactivate_plugins( [ 'gutenberg-supplements/gutenberg-supplements.php' ] );
	} );

	return;

}

require_once RT_GS_DIR . '/trait-singleton.php';
require_once RT_GS_DIR . '/class-register-blocks.php';

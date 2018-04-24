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

	add_action( 'admin_notices', 'plugin_dependency_notice' );

	/**
	 * Display plugin dependency notice and deactivate plugin.
	 */
	function plugin_dependency_notice() {
		$dependant_plugin_url = 'https://github.com/rtCamp/gutenberg-fields-middleware';

		/* translators: %1$s is link start tag, %2$s is link end tag */
		$message = sprintf( esc_html__( 'Gutenberg Supplements plugin require %1$sGutenberg Fields Middleware%2$s plugin. Please install/activate and try again.', 'gutenberg-supplements' ), '<a href="' . esc_url( $dependant_plugin_url ) . '" target="_blank">', '</a>' );
		printf( '<div class="error"><p>%s</p></div>', $message );

		deactivate_plugins( 'gutenberg-supplements/gutenberg-supplements.php' );
	}

	return;
}

require_once RT_GS_DIR . '/trait-singleton.php';
require_once RT_GS_DIR . '/class-register-blocks.php';

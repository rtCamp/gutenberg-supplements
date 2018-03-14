<?php
/**
 * Plugin Name: Gutenberg Supplements
 * Description:  Gutenberg Supplements
 * Author: rtCamp, sagarkbhatt, sayed, utkarsh, manishsongirkar36
 * Author URI: https://rtcamp.com/
 * Version: 0.1
 * License: GPLv2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: rt-blocks
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

require_once RT_GS_DIR . '/trait-singleton.php';
require_once RT_GS_DIR . '/class-register-blocks.php';

<?php
/**
 * Register plugin blocks
 *
 * @package rtBlocks
 */

namespace rtBlocks\Gutenblocks;

/**
 * Class Register_Blocks
 *
 * @package rtBlocks\Gutenblocks
 */
class Register_Blocks {

	use \rtBlocks\Traits\Singleton;

	/**
	 * Initialize Block.
	 */
	protected function init() {

		add_action( 'enqueue_block_editor_assets', array( $this, 'add_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'add_block_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'add_theme_assets' ) );
	}

	/**
	 * Enqueue assets related to editor,
	 */
	public function add_editor_assets() {

		wp_enqueue_script( 'rt-block-editor-assets', RT_GS_DIR_URL . 'blocks/build/build.js', RT_GS_VER );

		wp_enqueue_style(
			'faq-editor-css',
			RT_GS_DIR_URL . 'blocks/faq/editor.css'
		);
	}
	/**
	 * Enqueue assets required in both front-end and back-end.
	 */
	public function add_block_assets() {

		wp_enqueue_style( 'rt-block-assets', RT_GS_DIR_URL . 'blocks/build/style.css', RT_GS_VER );
	}

	/**
	 * Enqueue assets related to front-end
	 */
	public function add_theme_assets() {

		wp_enqueue_style(
			'faq-style-css',
			RT_GS_DIR_URL . 'blocks/faq/faq.css'
		);

		wp_enqueue_script(
			'faq-js',
			RT_GS_DIR_URL . 'blocks/faq/faq.js',
			array( 'jquery' )
		);
	}
}

add_action( 'plugins_loaded', function () {
	Register_Blocks::get_instance();
} );

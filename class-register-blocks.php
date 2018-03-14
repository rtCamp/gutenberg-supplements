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
	}

	/**
	 * Enqueue assets related to editor,
	 */
	public function add_editor_assets() {

		wp_enqueue_script( 'rt-block-editor-assets', RT_GS_DIR_URL . 'blocks/build/build.js', filemtime( RT_GS_DIR_PATH . 'blocks/build/build.js' ) );
		wp_enqueue_style( 'rt-block-editor-assets', RT_GS_DIR_URL . 'blocks/build/editor.css', filemtime( RT_GS_DIR_PATH . 'blocks/build/editor.css' ) );

	}
	/**
	 * Enqueue assets required in both front-end and back-end.
	 */
	public function add_block_assets() {

		if ( ! is_admin() ) {
			wp_enqueue_style( 'rt-block-assets', RT_GS_DIR_URL . 'blocks/build/style.css', filemtime( RT_GS_DIR_PATH . 'blocks/build/style.css' ) );
		}

	}
}

add_action( 'plugins_loaded', function () {
	Register_Blocks::get_instance();
} );

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

		//add_action( 'enqueue_block_editor_assets', array( $this, 'add_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'add_block_assets' ) );
	}

	/**
	 * Enqueue assets required in both front-end and back-end.
	 */
	public function add_block_assets() {

		wp_enqueue_style( 'rt-block-assets', RT_GS_DIR_URL . '/blocks/build/style.css', RT_GS_VER );
	}
}

add_action( 'plugins_loaded', function () {
	Register_Blocks::get_instance();
} );

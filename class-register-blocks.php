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

		// add_action( 'enqueue_block_editor_assets', array( $this, 'register_sample_block' ) );
	}
}

add_action( 'plugins_loaded', function () {
	Register_Blocks::get_instance();
} );

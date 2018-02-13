<?php
/**
 * Trait Singleton
 *
 * @package rtBlocks
 */

namespace rtBlocks\Traits;

/**
 * Trait Singleton
 */
trait Singleton {

	/**
	 * Instance of class.
	 *
	 * @var $instance
	 */
	protected static $instance;

	/**
	 * Create instance only once.
	 *
	 * @return static Current class object.
	 */
	final public static function get_instance() {
		return isset( static::$instance )
			? static::$instance
			: static::$instance = new static();
	}

	/**
	 * Singleton constructor.
	 */
	final private function __construct() {
		$this->init();
	}

	/**
	 * Action / Filters to be declare here.
	 */
	protected function init() {
	}

	/**
	 * Make private magic method wakeup.
	 */
	final private function __wakeup() {
	}

	/**
	 * Make private magic method clone.
	 */
	final private function __clone() {
	}
}

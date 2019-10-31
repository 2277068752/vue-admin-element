import Vue from 'vue';

declare global {
	interface Window {
		$globalHub: any;
	}
}

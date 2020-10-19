/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* global document */

import View from '@ckeditor/ckeditor5-ui/src/view';
import '@ckeditor/ckeditor5-ui/theme/components/icon/icon.css';

const GITLAB_SVGS_PATH = '../../gitlab-svgs/dist/icons.svg';

/* Rename CKEditor icons to match IDs from gitlab-svgs. */
const CKE_ICONS_TO_GITLAB_SVGS_MAP = {
	undo: 'redo',
	redo: 'repeat'
};

/**
 * The icon view class for GitLab SVG sprites (gitlab-svgs).
 *
 * @extends module:ui/view~View
 */
export default class IconView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bindTemplate;

		/**
		 * The SVG source of the icon.
		 *
		 * @observable
		 * @member {String} #content
		 */
		this.set( 'content', '' );

		/**
		 * This attribute specifies the boundaries to which the
		 * icon content should stretch.
		 *
		 * @observable
		 * @default '0 0 16 16'
		 * @member {String} #viewBox
		 */
		this.set( 'viewBox', '0 0 16 16' );

		this.setTemplate( {
			tag: 'svg',
			ns: 'http://www.w3.org/2000/svg',
			attributes: {
				class: [
					'ck',
					'ck-icon',
					'ck-gitlab-icon'
				],
				viewBox: bind.to( 'viewBox' )
			}
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		this._updateXMLContent();

		this.on( 'change:content', () => {
			this._updateXMLContent();
		} );
	}

	/**
	 * Updates the {@link #element} with the value of {@link #content}.
	 *
	 * @private
	 */
	_updateXMLContent() {
		this.element.innerHTML = '';

		const useElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'use' );

		useElement.setAttributeNS(
			'http://www.w3.org/1999/xlink',
			'href',
			`${ GITLAB_SVGS_PATH }#${ getMappedIconSpriteId( this.content.id ) }`
		);

		this.element.appendChild( useElement );
	}
}

function getMappedIconSpriteId( name ) {
	name = name.replace( '-usage', '' );

	return ( CKE_ICONS_TO_GITLAB_SVGS_MAP[ name ] || name );
}

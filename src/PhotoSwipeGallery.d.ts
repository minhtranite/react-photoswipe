/// <reference types="photoswipe" />

import * as React from 'react';
import * as Photoswipe from 'photoswipe';
import ReactPhotoSwipe, { PhotoSwipeProps } from './PhotoSwipe';

export interface PhotoSwipeGalleryProps extends Omit<PhotoSwipeProps, 'isOpen'> {
  items: Array<
    PhotoSwipe.Item & {
      thumbnail: string;
    }
  >;
  isOpen?: boolean;
  thumbnailContent: (item: Photoswipe.Item) => React.ReactNode;
}

declare class PhotoSwipeGallery extends ReactPhotoSwipe<PhotoSwipeGalleryProps, any> {}

export default PhotoSwipeGallery;

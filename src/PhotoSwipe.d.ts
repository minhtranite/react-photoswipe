/// <reference types="photoswipe" />

import * as React from 'react';
import * as Photoswipe from 'photoswipe';

export interface PhotoSwipeProps {
  isOpen: boolean;
  items: Array<PhotoSwipe.Item>;
  options?: PhotoSwipe.Options;
  onClose?: () => void;
  id?: string;
  className?: string;
  beforeChange?: (instance: PhotoSwipe) => void;
  afterChange?: (instance: PhotoSwipe) => void;
  imageLoadComplete?: (instance: PhotoSwipe, index: number, item: PhotoSwipe.Item) => void;
  resize?: (instance: PhotoSwipe) => void;
  gettingData?: (instance: PhotoSwipe, index: number, item: PhotoSwipe.Item) => void;
  mouseUsed?: (instance: PhotoSwipe) => void;
  initialZoomIn?: (instance: PhotoSwipe) => void;
  initialZoomInEnd?: (instance: PhotoSwipe) => void;
  initialZoomOut?: (instance: PhotoSwipe) => void;
  initialZoomOutEnd?: (instance: PhotoSwipe) => void;
  parseVerticalMargin?: (instance: PhotoSwipe, item: PhotoSwipe.Item) => void;
  close?: (instance: PhotoSwipe) => void;
  unbindEvents?: (instance: PhotoSwipe) => void;
  destroy?: (instance: PhotoSwipe) => void;
  updateScrollOffset?: (instance: PhotoSwipe, _offset: { x: number; y: number }) => void;
  preventDragEvent?: (
    instance: PhotoSwipe,
    e: MouseEvent,
    isDown: boolean,
    preventObj: { prevent: boolean },
  ) => void;
  shareLinkClick?: (instance: PhotoSwipe, e: MouseEvent, item: PhotoSwipe.Item) => void;
}

declare class PhotoSwipe<P = PhotoSwipeProps, S = any> extends React.Component<P, S> {
  static defaultProps: {
    options: object;
    onClose: () => void;
    id: string;
    className: string;
  };

  openPhotoSwipe: (props: PhotoSwipeProps) => void;

  updateItems: (items: Array<PhotoSwipe.Item>) => void;

  closePhotoSwipe: () => void;

  handleClose: () => void;
}

export default PhotoSwipe;

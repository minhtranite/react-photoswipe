# React PhotoSwipe

PhotoSwipe, PhotoSwipeGallery component for ReactJS base on [PhotoSwipe](http://photoswipe.com/).

## Installation

### NPM

```bash
npm install --save react-photoswipe
```

### Bower
```bash
bower install --save react-photoswipe
```

## Usage

### Styles

#### With webpack:

```js
import 'react-photoswipe/lib/photoswipe.css';
```

#### Without webpack:

```html
<link rel="stylesheet" type="text/css" href="path/to/react-photoswipe/lib/photoswipe.css">
```

### JS

#### PhotoSwipe

```js
import {PhotoSwipe} from 'react-photoswipe';

let isOpen = true;

let items = [
  {
    src: 'http://lorempixel.com/1200/900/sports/1',
    w: 1200,
    h: 900,
    title: 'Image 1'
  },
  {
    src: 'http://lorempixel.com/1200/900/sports/2',
    w: 1200,
    h: 900,
    title: 'Image 2'
  }
];

let options = {
  //http://photoswipe.com/documentation/options.html
};

handleClose = () => {
  isOpen: false
};

<PhotoSwipe isOpen={isOpen} items={items} options={options} onClose={handleClose}/>

```

#### PhotoSwipeGallery

```js
import {PhotoSwipeGallery} from 'react-photoswipe';

let items = [
  {
    src: 'http://lorempixel.com/1200/900/sports/1',
    thumbnail: 'http://lorempixel.com/120/90/sports/1',
    w: 1200,
    h: 900,
    title: 'Image 1'
  },
  {
    src: 'http://lorempixel.com/1200/900/sports/2',
    thumbnail: 'http://lorempixel.com/120/90/sports/2',
    w: 1200,
    h: 900,
    title: 'Image 2'
  }
];

let options = {
  //http://photoswipe.com/documentation/options.html
};

getThumbnailContent = (item) => {
  return (
    <img src={item.thumbnail} width={120} height={90}/>
  );
}

<PhotoSwipeGallery items={items} options={options} thumbnailContent={getThumbnailContent}/>
```

### UMD

```html
<link rel="stylesheet" type="text/css" href="path/to/react-photoswipe/dist/photoswipe.css">
<script src="path/to/react-photoswipe/dist/react-photoswipe.js"></script>
```

```js
var PhotoSwipe = window.ReactPhotoswipe.PhotoSwipe;
var PhotoSwipeGallery = window.ReactPhotoswipe.PhotoSwipeGallery;
```

Example [here](http://codepen.io/vn38minhtran/pen/XmVdvW/)

## Props

**Note:**  The first argument of every listener is a Photoswipe instance.

EX:
```js
beforeChange(instance, change);
imageLoadComplete(instance, index, item);
```

### PhotoSwipe

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| isOpen | bool | false | true |  |
| items | array | [] | true | http://photoswipe.com/documentation/getting-started.html |
| options | object | {} | false | http://photoswipe.com/documentation/options.html |
| onClose | function |  | false | Callback after PhotoSwipe close |
| id | string |  | false |  |
| className | string | `pswp` |  |
| beforeChange | function |  | false | Photoswipe event listener |
| afterChange | function |  | false | Photoswipe event listener |
| imageLoadComplete | function |  | false | Photoswipe event listener |
| resize | function |  | false | Photoswipe event listener |
| gettingData | function |  | false | Photoswipe event listener |
| mouseUsed | function |  | false | Photoswipe event listener |
| initialZoomIn | function |  | false | Photoswipe event listener |
| initialZoomInEnd | function |  | false | Photoswipe event listener |
| initialZoomOut | function |  | false | Photoswipe event listener |
| initialZoomOutEnd | function |  | false | Photoswipe event listener |
| parseVerticalMargin | function |  | false | Photoswipe event listener |
| close | function |  | false | Photoswipe event listener |
| unbindEvents | function |  | false | Photoswipe event listener |
| destroy | function |  | false | Photoswipe event listener |
| updateScrollOffset | function |  | false | Photoswipe event listener |
| preventDragEvent | function |  | false | Photoswipe event listener |
| shareLinkClick | function |  | false | Photoswipe event listener |

### PhotoSwipeGallery

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| items | array | [] | true | http://photoswipe.com/documentation/getting-started.html |
| options | object | {} | false | http://photoswipe.com/documentation/options.html |
| thumbnailContent | function | `<img src={item.src} width='100' height='100'/>` | false | Thumbnail content |
| id | string |  | false |  |
| className | string | `pswp-gallery` |  | 
| beforeChange | function |  | false | Photoswipe event listener |
| afterChange | function |  | false | Photoswipe event listener |
| imageLoadComplete | function |  | false | Photoswipe event listener |
| resize | function |  | false | Photoswipe event listener |
| gettingData | function |  | false | Photoswipe event listener |
| mouseUsed | function |  | false | Photoswipe event listener |
| initialZoomIn | function |  | false | Photoswipe event listener |
| initialZoomInEnd | function |  | false | Photoswipe event listener |
| initialZoomOut | function |  | false | Photoswipe event listener |
| initialZoomOutEnd | function |  | false | Photoswipe event listener |
| parseVerticalMargin | function |  | false | Photoswipe event listener |
| close | function |  | false | Photoswipe event listener |
| unbindEvents | function |  | false | Photoswipe event listener |
| destroy | function |  | false | Photoswipe event listener |
| updateScrollOffset | function |  | false | Photoswipe event listener |
| preventDragEvent | function |  | false | Photoswipe event listener |
| shareLinkClick | function |  | false | Photoswipe event listener |

## Demo

View [demo](http://minhtranite.github.io/react-photoswipe) or example folder.

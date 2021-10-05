# About The Project

Mini-Project Kelompok 2 Timer

POLBAN's JTK Web Developmenet tasks class 2021. This repository holds the code for the first mini-project of building a Timer with start, stop, and pause feature. Plus the challenge feature of persistent on closing the tab, and also having multiple timer with only one that runs. All only using Vanilla HTML, CSS, and JS.

### Approach

Our team approach to making a Timer in Vanilla JS, HTML, and CSS are doing it using the amazing API of [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) which allow us to make a reusable component without even using any libraries. While there exist a lot of [libraries or elements](https://www.webcomponents.org/elements) for it we do make all of our component ourself from scratch. So you'll see the most logic will lies in `/components/timer.js`.

Using shadowDOM (something like virtual DOM in React and other JS libraries) we are able to make as many component as we can while maintaning the isolation between those componenets. To also make the component persistent, we do store the value in local storage of the browser. To maintain many components persistent, we make sure the componenet will only write to the local storage if the attribute key is set. To write and read from the local storage itself we're using the lifecyle of the componenet, first loading when the component is about be loaded, which will be where constructor is called. And write off to the localhost when the window itself about to unload, using event listener.



## Built With

This Project Build With :
* [Vanilla JS]
* [HTML]
* [CSS]

## Getting Started

Open up `index.html` on your browser as long as it is not Opera Mini, or IE, while Safari **might** have problem ([compability list of web components](https://caniuse.com/?search=web%20components))

## Usage

You can use this to know how to build a stopwatch just using vanilla javascript

## Roadmap

- [x] Add function start, pause, resume, and stop.
- [x] Add local storage
- [x] Add Formatting Time
- [x] Add function remover and add Stopwatch
- [x] Add Style 

See the [open issues](https://github.com/fauh45/Kelompok2_timer_javascript/issues) for a full list of proposed features (and known issues).

## Contributing

If you have a suggestion that would make this stopwatch better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

Distributed under the MIT License.

## Contact

You can contact our leader 
Fauh45 - [@fauh45](https://github.com/fauh45)

## Acknowledgments

I found this helpful and I would like to give credit to :
* [Styling in the Shadow DOM With CSS Shadow Parts ](https://css-tricks.com/styling-in-the-shadow-dom-with-css-shadow-parts/)

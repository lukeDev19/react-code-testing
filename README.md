## Setup

You need to sign up for an OpenWeather API key. Instructions are here: https://openweathermap.org/appid

After you get your API, add that as API_KEY in city-weather.tsx

## Mock bug report

Steps to reproduce:

1. Type a valid US city in the "Weather Search" box
1. Press {enter}

Expected results
User should see the current weather results for that city

Actual Results:
App crashes

## Deliverable 1:

1. Fix the bug
   - Treating this like a bug ticket, identify the bug in the application and provide a fix.
2. Talk about your changes

   - Write a short description about what was the underlying cause of the bug and how you fixed it

     The following code on city-weather.tsx is the cause of the bug:
     this.state = {
     weatherResult: null
     };
     Because on the render method, it tries to grab the properties('main', 'weather') of weatherResult, but it's initially null, so it's crashed.
     To fix this,

     - added the loading status which is initially set as true value.
     - loading status is set as false after the api calling is finished.
     - only when the loading status is false, then it renders the result, otherwise, result isn't rendered.

## Deliverable 2:

1. Create a city-weather-refactor.tsx file, in which you refactor the city-weather component to use react hooks rather than React.Component. Incorporate the following:

   1. Match the design
      - A designer has provided a comp on how this app should look (see design.png)
        - To match the design you may need to use different fields that are retuned from teh openweathermap API. For example, the weather condition three digit code can be [mapped to the icons here](https://openweathermap.org/weather-conditions)
      - Tailwindcss is installed and configured for you
   2. Improve web accessibility
      - Ensure that clicking on the label "Weather Search" puts focus into the text-input.
      - Make sure any loading states are correctly announced to a screen reader
   3. Make the tests better
      - There was a test written for this feature but it clearly didn't catch the bug, make the test better (you can open a new terminal in the bottom right of code sandbox and `yarn test`)

2. Talk about your changes

   - For the refactor and other accompanying tasks, include any other thoughts, assumptions, or known compromises in how you approached the work.

   I created the service, utils, and config directories for refactoring.

   - service/api.ts is to handle the api calls.
   - utils/index.ts is to handle the utils such as getWeahterIcon is to get the entire string from given icon status.
   - config/index.ts is to store the config variables such as weaher api key.

   For future improvements, I'd recommend to sotre the config variables to environment variables since these are sensitive data, so we need to secure them.

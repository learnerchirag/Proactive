import React from "react";

export default function Timeline() {
  return (
    <React.Fragment>
      <h1>
        Notable inventions, <span>1910–2000</span>
      </h1>
      <div class="flex-parent">
        <div class="input-flex-container">
          <input type="radio" name="timeline-dot" data-description="1910" />
          <div class="dot-info" data-description="1910">
            <span class="year">1910</span>
            <span class="label">headset</span>
          </div>
          <input type="radio" name="timeline-dot" data-description="1920" />
          <div class="dot-info" data-description="1920">
            <span class="year">1920</span>
            <span class="label">jungle gym</span>
          </div>
          <input
            type="radio"
            name="timeline-dot"
            data-description="1930"
            checked
          />
          <div class="dot-info" data-description="1930">
            <span class="year">1930</span>
            <span class="label">chocolate chip cookie</span>
          </div>
          <input type="radio" name="timeline-dot" data-description="1940" />
          <div class="dot-info" data-description="1940">
            <span class="year">1940</span>
            <span class="label">Jeep</span>
          </div>
          <input type="radio" name="timeline-dot" data-description="1950" />
          <div class="dot-info" data-description="1950">
            <span class="year">1950</span>
            <span class="label">leaf blower</span>
          </div>
          <input type="radio" name="timeline-dot" data-description="1960" />
          <div class="dot-info" data-description="1960">
            <span class="year">1960</span>
            <span class="label">magnetic stripe card</span>
          </div>
          <input type="radio" name="timeline-dot" data-description="1970" />
          <div class="dot-info" data-description="1970">
            <span class="year">1970</span>
            <span class="label">wireless LAN</span>
          </div>
          <input type="radio" name="timeline-dot" data-description="1980" />
          <div class="dot-info" data-description="1980">
            <span class="year">1980</span>
            <span class="label">flash memory</span>
          </div>
          <input type="radio" name="timeline-dot" data-description="1990" />
          <div class="dot-info" data-description="1990">
            <span class="year">1990</span>
            <span class="label">World Wide Web</span>
          </div>
          <input type="radio" name="timeline-dot" data-description="2000" />
          <div class="dot-info" data-description="2000">
            <span class="year">2000</span>
            <span class="label">Google AdWords</span>
          </div>
          <div id="timeline-descriptions-wrapper">
            <p data-description="1910">
              And future Call of Duty players would thank them.
            </p>
            <p data-description="1920">
              Because every kid should get to be Tarzan for a day.
            </p>
            <p data-description="1930">And the world rejoiced.</p>
            <p data-description="1940">
              Because building roads is inconvenient.
            </p>
            <p data-description="1950">Ain’t nobody got time to rake.</p>
            <p data-description="1960">Because paper currency is for noobs.</p>
            <p data-description="1970">Nobody likes cords. Nobody.</p>
            <p data-description="1980">Brighter than glow memory.</p>
            <p data-description="1990">
              To capitalize on an as-yet nascent market for cat photos.
            </p>
            <p data-description="2000">
              Because organic search rankings take work.
            </p>
          </div>
        </div>
      </div>

      <div style="position: absolute; bottom: 15px; right: 10px; font-size: 12px">
        <a href="https://codepen.io/cjl750/pen/mXbMyo" target="_blank">
          based off of version 3
        </a>
      </div>
    </React.Fragment>
  );
}

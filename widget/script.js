// Declaration of most const and lets

const zips = [];
const footer = document.getElementById("footer");

// Validation for ZIP code input

function is_valid_datalist_value(inputValue, cityValue) {
  const filtered = zips.filter(({ PLZ }) => PLZ.toString() == inputValue);
  const filteredCity = zips.filter(({ ORT }) => ORT.toString() == cityValue);

  if (filtered.length > 0 && filteredCity.length > 0) {
    return true;
  }
  return false;
}

// Function to go to step 2

function progress() {
  let y = document.getElementById("zipcode");
  let x = document.getElementById("zipcode").value.split(" ")[0].trim();
  let xi = document.getElementById("zipcode").value.split(" ")[1]
    ? y.value.substr(y.value.indexOf(" ") + 1)
    : "";

  if (x.length < 5) {
    return false;
  } else if (is_valid_datalist_value(x, xi)) {
    console.log("Ok we can go now");
    window.location = "https://staging.wahlbrief.de/?zip=" + x + "&city=" + xi;
  }
}

// Function to get items from JSON and build array

(async () => {
  const endpoint = "assets/test.json";
  const result = await fetch(endpoint).then((blob) => blob.json());

  const sorted = result.sort((a, b) => {
    if (a.PLZ !== b.PLZ) {
      return a.PLZ - b.PLZ;
    }

    if (a.ORT > b.ORT) {
      return 1;
    } else {
      return -1;
    }
  });

  zips.push(...sorted);
})();

// Function to find matches

function findMatches(keyword, zips) {
  return zips.filter((place) => {
    return place.PLZ.toLowerCase().startsWith(keyword.toLowerCase());
  });
}

const searchInput = document.querySelector("#zipcode");
const suggestions = document.querySelector("#autocomplete-list");

let active = -1;

// Function to set the focus on elements on keypress

function setFocus() {
  const children = Array.from(suggestions.children);
  const len = children.length;
  if (len == 0) {
    return;
  }

  if (active >= 0) {
    active %= len;

    children.forEach((child) => child.classList.remove("autocomplete-active"));
    children[active].classList.add("autocomplete-active");
    children[active].scrollIntoView();
  }
}

const keyUpListener = (e) => {
  if (e.keyCode == "13") {
    e.target.removeEventListener("keyup", keyUpListener);
    progress();
    active = -1;
  }
};

// Function to set input box content on enter button on suggestion

function onEnter() {
  const children = Array.from(suggestions.children);
  const len = children.length;

  if (len == 0) {
    return;
  }

  if (len == 1) {
    active %= len;
    children[active].click();
    setTimeout(function () {
      progress();
    }, 300);
  }

  if (active > 1) {
    active %= len;
    children[active].click();
    searchInput.addEventListener("keyup", keyUpListener);
  }
}

let timeoutReference;

searchInput.addEventListener("keyup", (e) => {
  timeoutReference && clearTimeout(timeoutReference);

  timeoutReference = setTimeout(() => {
    switch (e.keyCode) {
      case 40:
        active++;
        setFocus();
        return;

      case 38:
        active--;
        setFocus();
        return;

      case 13:
        onEnter();
        return;

      case 27:
        e.target.value = "";
        suggestions.innerHTML = "";
        return;
    }

    active = -1;

    if (!e.target.value) {
      suggestions.innerHTML = "";
      return;
    }

    // Function to create autocomplete suggestions

    const matchArray = findMatches(e.target.value, zips);
    const divs = matchArray.map((place) => {
      const div = document.createElement("div");
      const nameSpan = document.createElement("span");

      const val = `${place.PLZ} ${place.ORT}`;

      nameSpan.innerText = val;
      div.appendChild(nameSpan);

      footer.scrollIntoView();

      div.addEventListener("click", () => {
        searchInput.value = val;
        suggestions.innerHTML = "";
      });

      return div;
    });

    if (matchArray.length <= 0) {
      suggestions.innerHTML =
        "<div class='error'><span>Ungültige Postleitzahl</span></div>";
      return;
    }

    suggestions.innerHTML = "";
    suggestions.append(...divs);
  }, 450);
});

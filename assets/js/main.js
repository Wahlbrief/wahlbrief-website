// Declaration of most const and lets

const zips = [];

const mql = window.matchMedia("(max-width: 768px)");
const mqlr = mql.matches;

const el1 = document.getElementById("intro");
const el2 = document.getElementById("bigletter");
const el3 = document.getElementById("outro");
const el4 = document.getElementById("address-mobile");
const el5 = document.getElementById("preview-mobile");
const el6 = document.getElementById("preview");
const el7 = document.getElementById("outro-bottom");

let rad = document.getElementsByName("flexRadioDefault");
let newform = document.getElementById("newform");
let address = document.getElementById("ogaddress");
let newaddress = document.getElementById("newaddress");
let finaladdress = document.getElementById("finalogaddress");
let finalnewaddress = document.getElementById("finalnewaddress");
let newsletter = document.getElementById("subscription");
const subject = document.getElementById("subject");
const instructionemail = document.getElementById("instruction-email");
const munname = document.getElementById("munname");
const munemail = document.getElementById("munemail");
const muniname = document.getElementById("muniname");
const muniemail = document.getElementById("muniemail");
const finalmuniname = document.getElementById("final-munname");
const finalmuniemail = document.getElementById("final-munemail");
const prefillzip = document.getElementById("form-zip");
const prefillcity = document.getElementById("form-city");
const cb = document.getElementById("cb1");

// Function to hide/show items based on radio buttons selected

for (var i = 0; i < rad.length; i++) {
  rad[i].onclick = function () {
    if (this.value == "different") {
      newform.style.display = "block";
      newform.scrollIntoView();
      address.style.display = "none";
      finaladdress.style.display = "none";
      newaddress.style.display = "inline-block";
      finalnewaddress.style.display = "inline-block";
    } else if (this.value == "normal") {
      newform.style.display = "none";
      address.style.display = "inline-block";
      finaladdress.style.display = "inline-block";
      newaddress.style.display = "none";
      finalnewaddress.style.display = "none";
    }
  };
}

// Function to show/hide items based on the mobile toggle

cb.addEventListener("change", (event) => {
  const result = cb.checked;
  if (result == true) {
    newform.style.display = "block";
    newform.scrollIntoView();
    address.style.display = "none";
    finaladdress.style.display = "none";
    newaddress.style.display = "inline-block";
    finalnewaddress.style.display = "inline-block";
  } else if (result == false) {
    newform.style.display = "none";
    address.style.display = "inline-block";
    finaladdress.style.display = "inline-block";
    newaddress.style.display = "none";
    finalnewaddress.style.display = "none";
  }
});

// Declaration of form inputs and plugging their data into the letter previews

const checks = [
  "name",
  "newname",
  "surname",
  "newsurname",
  "address",
  "street",
  "newstreet",
  "zip",
  "newzip",
  "city",
  "newcity",
];

checks.forEach((check) => {
  const spans = document.getElementById(`${check}`);
  const form = document.getElementById(`form-${check}`);
  const final = document.getElementById(`final-${check}`);
  const identity = document.getElementById(`id-${check}`);
  const finalid = document.getElementById(`final-id-${check}`);
  const br = Array.from(document.querySelectorAll(`[data-br=${check}]`));

  form.addEventListener("input", (e) => {
    spans.textContent = e.target.value;
    identity.textContent = e.target.value;
    finalid.textContent = e.target.value;
    final.textContent = e.target.value;

    if (br.length !== 0) {
      if (e.target.value) {
        br.forEach((b) => (b.style.display = "inline"));
      } else {
        br.forEach((b) => (b.style.display = "none"));
      }
    }
  });
});

// Birthday inputs

const spanDay = document.getElementById("birthdate");
const spanMonth = document.getElementById("birthmonth");
const spanYear = document.getElementById("birthyear");

const finalDay = document.getElementById("final-birthdate");
const finalMonth = document.getElementById("final-birthmonth");
const finalYear = document.getElementById("final-birthyear");

const DayInput = document.getElementById("form-day");
const MonthInput = document.getElementById("form-month");
const YearInput = document.getElementById("form-year");

DayInput.addEventListener("input", (e) => {
  spanDay.textContent = e.target.value + ".";
  finalDay.textContent = e.target.value + ".";
});

MonthInput.addEventListener("input", (e) => {
  spanMonth.textContent = e.target.value + ".";
  finalMonth.textContent = e.target.value + ".";
});

YearInput.addEventListener("input", (e) => {
  spanYear.textContent = e.target.value;
  finalYear.textContent = e.target.value;
});

// Function to make fieldset change when inputs inside are valid

const BirthdayForm = document.querySelector("fieldset");
const AllInputs = Array.from(BirthdayForm.querySelectorAll("input"));

AllInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    const allValid = AllInputs.every((input) => {
      return input && input.validity.valid && input.value.length > 0;
    });
    if (!allValid) {
      BirthdayForm.style.boxShadow = "none";
    } else {
      BirthdayForm.style.boxShadow = "0 0 0 0.15rem green";
    }
  });
});

// Scroll to top function

function scrollTop() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
}

// Validation for ZIP code input
let lastEmail = null;

function is_valid_datalist_value(inputValue, cityValue) {
  const filtered = zips.filter(
    (item) =>
      item.PLZ.toString() == inputValue &&
      item.ORT.toString() === cityValue &&
      (lastEmail ? item["E-Mail"].toString() == lastEmail : true)
  );

  if (filtered.length > 0) {
    const preinput = filtered[0];
    const data = preinput; // try?
    munname.textContent = data.ORT;
    munemail.textContent = atob(data["E-Mail"]);
    muniname.textContent = data.ORT;
    muniemail.textContent = atob(data["E-Mail"]);
    finalmuniname.textContent = data.ORT;
    finalmuniemail.textContent = atob(data["E-Mail"]);
    instructionemail.textContent = atob(data["E-Mail"]);
    prefillcity.value = "";
    prefillcity.value = data.ORT;
    prefillzip.value = "";
    prefillzip.value = preinput.PLZ;
    const event = new Event("input", { bubbles: true, cancellable: true });
    prefillzip.dispatchEvent(event);
    prefillcity.dispatchEvent(event);
    return true;
  }
  return false;
}

// Function to go to step 2

function secondpage() {
  let SecondTab = document.querySelector("#step-2-tab");
  let tab = new bootstrap.Tab(SecondTab);
  let y = document.getElementById("zipcode");
  let z = document.getElementById("validation");
  let x = document.getElementById("zipcode").value.split(" ")[0].trim();
  let xi = document.getElementById("zipcode").value.split(" ")[1]
    ? y.value.substr(y.value.indexOf(" ") + 1)
    : "";

  if (x.length < 5) {
    return false;
  } else if (is_valid_datalist_value(x, xi)) {
    tab.show();
    scrollTop();

    el1.style.display = "none";
    el2.style.display = "block";

    if (mqlr == false) {
      el4.style.display = "none";
    } else el4.style.display = "block";
  }
}

// Function to go to step 3

function thirdpage() {
  let ThirdTab = document.querySelector("#step-3-tab");
  let tab = new bootstrap.Tab(ThirdTab);

  tab.show();
  scrollTop();

  el2.style.display = "none";

  if (mqlr == false) {
    el3.style.display = "block";
    el4.style.display = "none";
    el5.style.display = "none";
    el6.style.display = "block";
    el7.style.display = "none";
  } else {
    el3.style.display = "none";
    el4.style.display = "none";
    el5.style.display = "block";
    el6.style.display = "none";
    el7.style.display = "block";
  }
}

// Function to go back to step 1 from step 2

function backtofirstpage() {
  let FirstTab = document.querySelector("#step-1-tab");
  let tab = new bootstrap.Tab(FirstTab);

  tab.show();
  scrollTop();
  el1.style.display = "block";
  el2.style.display = "none";
  el4.style.display = "none";
}

// Function to go back to step 2 from step 3

function backtosecondpage() {
  let SecondTab = document.querySelector("#step-2-tab");
  let tab = new bootstrap.Tab(SecondTab);

  tab.show();
  scrollTop();

  el2.style.display = "block";
  el3.style.display = "none";

  if (mqlr == false) {
    el4.style.display = "none";
    el5.style.display = "none";
  } else {
    el4.style.display = "block";
    el5.style.display = "none";
  }
}

// Function to grab letter content and add it to the email send button

class Mailto_url {
  constructor() {
    const encode_mailto_component = function (str) {
      try {
        return encodeURIComponent(str);
      } catch (e) {
        return escape(str);
      }
    };
    class AddressList {
      constructor() {
        const list = [];
        this.length = 0;
        this.add = function (address) {
          if (address) {
            list.push(address);
            this.length = list.length;
          }
        };
        this.get = function () {
          return list.join(";");
        };
      }
    }
    let subject = "",
      body = "",
      mainList = new AddressList(),
      ccList = new AddressList(),
      bccList = new AddressList();
    this.setSubject = function (str) {
      subject = encode_mailto_component(str);
    };
    this.setBody = function (str) {
      body = encode_mailto_component(str);
    };
    this.addMain = function (x) {
      mainList.add(x);
    };
    this.addCC = function (x) {
      ccList.add(x);
    };
    this.addBCC = function (x) {
      bccList.add(x);
    };
    this.getURL = function (allow_empty_mainList) {
      const out = ["mailto:"];
      const extras = [];
      if (mainList.length === 0 && !allow_empty_mainList) {
        throw "Mailto_url: no main addressees";
      } else {
        out.push(mainList.get());
      }
      if (subject) {
        extras.push("subject=" + subject);
      }
      if (ccList.length) {
        extras.push("cc=" + ccList.get());
      }
      if (bccList.length) {
        extras.push("bcc=" + bccList.get());
      }
      if (body) {
        extras.push("body=" + body);
      }
      if (extras.length) {
        out.push("?" + extras.join("&"));
      }
      return out.join("");
    };
  }
}

// Function to get the full text and set subject, to: field

function getContent(link) {
  const quote = document.getElementById("letter-content");
  if (quote && quote.innerText) {
    let mailTo = new Mailto_url();
    mailTo.addMain(munemail.textContent);
    mailTo.setSubject(subject.textContent);
    mailTo.setBody(quote.innerText);
    link.href = mailTo.getURL(true);
    return true;
  }
  return false;
}

// Function to initialize tooltips

const copyButtons = Array.from(document.querySelectorAll(".copy"));
copyButtons.forEach((btn) => {
  const tooltip = new bootstrap.Tooltip(btn, {
    parent: btn,
    trigger: "manual",
  });
  const clipboard = new ClipboardJS(btn);
  clipboard.on("success", function (e) {
    e.clearSelection();
    tooltip.update();
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
    }, 2000);
  });
});

// Function to get items from JSON and build array

(async () => {
  const endpoint = "assets/plz.json";
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

  // DO NOT USE, 2000+ ms processing time required for duplicate removal
  // const properties = ["PLZ", "ORT", "E-Mail"];
  // const unique = sorted.filter(
  //   (item, index, arr) =>
  //     index ===
  //     arr.findIndex((someItem) =>
  //       properties.every((prop) => item[prop] === someItem[prop])
  //     )
  // );

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
const scrollTo = document.querySelector("#next-click");

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
  }
}

const keyUpListener = (e) => {
  if (e.keyCode == "13") {
    e.target.removeEventListener("keyup", keyUpListener);
    secondpage();
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
      secondpage();
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

      searchInput.scrollIntoView();

      div.addEventListener("click", () => {
        searchInput.value = val;
        lastEmail = place["E-Mail"];
        suggestions.innerHTML = "";
      });

      return div;
    });

    if (matchArray.length <= 0) {
      let string = location.href;
      let convertedString = string.toLowerCase();

      if (convertedString.indexOf("en") != -1) {
        suggestions.innerHTML =
          "<div class='error'><i class='fas fa-times-circle me-2'></i><span>Invalid ZIP code</span></div>";
      } else {
        suggestions.innerHTML =
          "<div class='error'><i class='fas fa-times-circle me-2'></i><span>Ungültige Postleitzahl</span></div>";
      }
      return;
    }

    suggestions.innerHTML = "";
    suggestions.append(...divs);
  }, 50);
});

// Function to get the query parameter from the URL on load

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const externalZIP = urlParams.get("zip");
const externalCITY = urlParams.get("city");

window.addEventListener("DOMContentLoaded", () => {
  if (externalZIP == null && externalCITY == null) {
    return;
  } else if (externalZIP != null && externalCITY != null) {
    searchInput.value = externalZIP + " " + externalCITY;
    document.body.style.opacity = "0";
    setTimeout(function () {
      document.body.classList.add("faded");
      document.body.style.opacity = "1";
      secondpage();
    }, 350);
  } else {
    return;
  }
});

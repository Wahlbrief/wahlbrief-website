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
const munname = document.getElementById("munname");
const munemail = document.getElementById("munemail");
const muniname = document.getElementById("muniname");
const muniemail = document.getElementById("muniemail");
const finalmuniname = document.getElementById("final-munname");
const finalmuniemail = document.getElementById("final-munemail");
const cb = document.getElementById("cb1");

for (var i = 0; i < rad.length; i++) {
  rad[i].onclick = function () {
    if (this.value == "different") {
      newform.style.display = "block";
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

cb.addEventListener("change", (event) => {
  const result = cb.checked;
  if (result == true) {
    newform.style.display = "block";
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

const checks = ["name", "surname", "street", "number", "zip", "city"];

checks.forEach((check) => {
  const spans = document.getElementById(`${check}`);
  const form = document.getElementById(`form-${check}`);
  const final = document.getElementById(`final-${check}`);
  const identity = document.getElementById(`id-${check}`);
  const finalid = document.getElementById(`final-id-${check}`);

  form.addEventListener("input", (e) => {
    spans.textContent = e.target.value;
    identity.textContent = e.target.value;
    finalid.textContent = e.target.value;
    final.textContent = e.target.value;
  });
});

const spanDate = document.getElementById("birthday");
const finalDate = document.getElementById("final-birthday");
const birthdayInput = document.getElementById("form-birthday");

birthdayInput.addEventListener("input", (e) => {
  spanDate.textContent = e.target.value.split("-").reverse().join(".");
  finalDate.textContent = e.target.value.split("-").reverse().join(".");
});

function scrollTop() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
}

function is_valid_datalist_value(idDataList, inputValue) {
  const filtered = zips.filter(({ PLZ }) => PLZ.toString() == inputValue);

  if (filtered.length > 0) {
    const data = filtered[0];
    munname.textContent = data.ORT;
    munemail.textContent = data["E-Mail"];
    muniname.textContent = data.ORT;
    muniemail.textContent = data["E-Mail"];
    finalmuniname.textContent = data.ORT;
    finalmuniemail.textContent = data["E-Mail"];
    return true;
  }

  return false;
}

function secondpage() {
  let SecondTab = document.querySelector("#step-2-tab");
  let tab = new bootstrap.Tab(SecondTab);
  let x = document.getElementById("zipcode").value.split(",")[0].trim();
  let y = document.getElementById("zipcode");
  let z = document.getElementById("validation");

  if (x.length < 5) {
    z.textContent = "You have inserted less than 5 digits!";
    setTimeout(function () {
      z.textContent = "";
    }, 3500);
    return false;
  } else if (is_valid_datalist_value("codes", x)) {
    tab.show();
    scrollTop();

    el1.style.display = "none";
    el2.style.display = "block";

    if (mqlr == false) {
      el4.style.display = "none";
    } else el4.style.display = "block";
  } else {
    y.value = "";
    z.textContent = "You have entered an incorrect ZIP code! Try again.";
    setTimeout(function () {
      z.textContent = "";
    }, 4000);
  }
}

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

function backtofirstpage() {
  let FirstTab = document.querySelector("#step-1-tab");
  let tab = new bootstrap.Tab(FirstTab);

  tab.show();
  scrollTop();
  el1.style.display = "block";
  el2.style.display = "none";
  el4.style.display = "none";
}

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

function Mailto_url() {
  var encode_mailto_component = function (str) {
    try {
      return encodeURIComponent(str);
    } catch (e) {
      return escape(str);
    }
  };
  var AddressList = function () {
    var list = [];
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
  };
  var subject = "",
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
    var out = ["mailto:"];
    var extras = [];
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

function getContent(link) {
  var quote = document.getElementById("final-letter");
  if (quote && quote.innerText) {
    var mailTo = new Mailto_url();
    mailTo.addMain(munemail.textContent);
    mailTo.setSubject("Wahlbrief 2021 - Mail");
    mailTo.setBody(quote.innerText);
    link.href = mailTo.getURL(true);
    return true;
  }
  return false;
}

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", function (e) {
  e.clearSelection();
});

(async () => {
  const endpoint = "/assets/test.json";
  const result = await fetch(endpoint).then((blob) => blob.json());

  zips.push(...result);
})();

function findMatches(keyword, zips) {
  return zips.filter((place) => {
    const regex = new RegExp(keyword, "gi");
    return place.PLZ.match(regex);
  });
}

const searchInput = document.querySelector("#zipcode");
const suggestions = document.querySelector("#autocomplete-list");

let active = -1;

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

function onEnter() {
  const children = Array.from(suggestions.children);
  const len = children.length;
  if (len == 0) {
    return;
  }

  if (active >= 0) {
    active %= len;

    children[active].click();
  }
}

searchInput.addEventListener("keyup", (e) => {
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
  }

  active = -1;

  if (!e.target.value) {
    suggestions.innerHTML = "";
    return;
  }

  const matchArray = findMatches(e.target.value, zips);
  const divs = matchArray.map((place) => {
    const div = document.createElement("div");
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name");

    const val = `${place.PLZ}, ${place.ORT}`;

    nameSpan.innerText = val;
    div.appendChild(nameSpan);

    div.addEventListener("click", () => {
      searchInput.value = val;
      suggestions.innerHTML = "";
    });

    return div;
  });

  suggestions.innerHTML = "";
  suggestions.append(...divs);
});

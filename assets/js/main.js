const mql = window.matchMedia("(max-width: 768px)");
const mqlr = mql.matches;

const el1 = document.getElementById("intro");
const el2 = document.getElementById("bigletter");
const el3 = document.getElementById("outro");
const el4 = document.getElementById("address-mobile");
const el5 = document.getElementById("preview-mobile");
const el6 = document.getElementById("preview");
const el7 = document.getElementById("outro-bottom");

let rad = document.main.flexRadioDefault;
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
const cb = document.getElementById("cb1");
const cbnews = document.getElementById("emailupdates");
const cbnewsmobile = document.getElementById("emailupdatesMobile");

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

cbnews.addEventListener("change", (event) => {
  const result = cbnews.checked;
  if (result == true) {
    newsletter.style.display = "block";
  } else if (result == false) {
    newsletter.style.display = "none";
  }
});

cbnewsmobile.addEventListener("change", (event) => {
  const result = cbnewsmobile.checked;
  if (result == true) {
    newsletter.style.display = "block";
  } else if (result == false) {
    newsletter.style.display = "none";
  }
});

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

const checks = [
  "name",
  "surname",
  "birthday",
  "newname",
  "newsurname",
  "street",
  "number",
  "zip",
  "city",
];

checks.forEach((check) => {
  const spans = document.getElementById(`${check}`);
  const form = document.getElementById(`form-${check}`);
  const final = document.getElementById(`final-${check}`);

  form.addEventListener("input", (e) => {
    spans.textContent = e.target.value;
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
  let option = document.querySelector(
    "#" + idDataList + " option[value='" + inputValue + "']"
  );
  if (option != null) {
    munname.textContent = option.getAttribute("data-mun");
    munemail.textContent = option.getAttribute("data-email");
    muniname.textContent = option.getAttribute("data-mun");
    muniemail.textContent = option.getAttribute("data-email");
    return option.value.length > 0;
  }
  return false;
}

document.getElementById("zipcode").addEventListener("click", function (e) {
  let input = e.target,
    list = input.getAttribute("list");

  if (list) {
    input.setAttribute("data-list", list);
    input.removeAttribute("list");
  }
});

document.getElementById("zipcode").addEventListener("keydown", function (e) {
  let input = e.target,
    list = input.getAttribute("data-list");

  if (list) {
    input.setAttribute("list", list);
    input.removeAttribute("data-list");
  }
});

function secondpage() {
  let SecondTab = document.querySelector("#step-2-tab");
  let tab = new bootstrap.Tab(SecondTab);
  let x = document.getElementById("zipcode").value;
  let y = document.getElementById("zipcode");
  let z = document.getElementById("validation");

  if (x.length < 5) {
    z.textContent = "You have inserted less than 5 digits!";
    setTimeout(function () {
      z.textContent = "";
    }, 3500);
    return false;
  } else if (
    is_valid_datalist_value("codes", document.getElementById("zipcode").value)
  ) {
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

const quoteUrl = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const options = { method: "GET", headers: { accept: "application/json" } };

// const imageUrl = "https://random-image-pepebigotes.vercel.app/api/random-image";
const imageUrl = "https://api.nekosapi.com/v4/images/random";

let loading = false;

const images = [
  "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1642&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1194&q=80",
  "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1177&q=80",
  "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1559&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  "https://images.unsplash.com/photo-1462400362591-9ca55235346a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80",
  "https://images.unsplash.com/photo-1484591974057-265bb767ef71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1508163223045-1880bc36e222?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  "https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1431631927486-6603c868ce5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];

const newQuoteButton = getElement(".newQuote");
const twitter = getElement(".twitter");
const loadingIcon = getElement(".loading");
const author = getElement(".author");
const quote = getElementById("quote");

function getElementById(id) {
  return document.getElementById(id);
}

function getElement(className) {
  return document.querySelector(className);
}

const getRandomQuote = async (toBeDsiabled = false) => {
  loadingIcon.style.display = "inline-block";
  newQuoteButton.disabled = toBeDsiabled;
  try {
    const response = await fetch(quoteUrl, options);
    const data = await response.json();

    if (data.statusCode !== 200) {
      loading = false;
      throw new Error(data.message);
    } else {
      quote.innerHTML = data.data.content;
      author.innerHTML = data.data.author;
      let card = document.querySelector(".card");
      card.style.backgroundImage = `url(${getRandomImage(images)})`;
      card.style.loading = "lazy";
      loading = false;
    }
  } catch (error) {
    console.error(error);
  }
  newQuoteButton.disabled = false;
  loadingIcon.style.display = "none";
};

function getRandomImage(images) {
  let index = Math.floor(Math.random() * images.length);
  return images[index];
}

getRandomQuote();

const copyQuote = () => {
  navigator.clipboard.writeText(getFormattedQuote());
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Quote Copied: ";
};

function getFormattedQuote() {
  const quote = document.getElementById("quote").innerText;
  const author = document.querySelector(".author").innerText;
  const formattedQuote = `“${quote}”\n\n— ${author}`;
  return formattedQuote;
}

const shareOnTwitter = () => {
  const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    getFormattedQuote()
  )}`;
  window.open(tweetUrl, "_blank");
};

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}

function saveCardAsImage() {
  const cardElement = document.querySelector(".card");

  html2canvas(cardElement, { useCORS: true, backgroundColor: null }).then(
    (canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${author.innerHTML}-quote`;
      return link.click();
    }
  );
}

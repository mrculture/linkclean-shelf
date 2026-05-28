const inputUrl = document.querySelector("#inputUrl");
const outputUrl = document.querySelector("#outputUrl");
const statusMessage = document.querySelector("#statusMessage");
const summaryLinks = document.querySelector("#summaryLinks");
const summaryParams = document.querySelector("#summaryParams");

const options = {
  removeTracking: document.querySelector("#removeTracking"),
  sortParams: document.querySelector("#sortParams"),
  trimPunctuation: document.querySelector("#trimPunctuation"),
};

const trackingParameters = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
  "dclid",
  "msclkid",
  "mc_cid",
  "mc_eid",
  "igshid",
  "vero_id",
  "_hsenc",
  "_hsmi",
]);

const sampleText =
  "https://example.com/products?utm_source=newsletter&utm_medium=email&utm_campaign=spring&fbclid=abc123&variant=blue\n\nRead this too: https://example.org/article?gclid=test123&ref=homepage&keep=yes.";

function extractUrls(text) {
  return [...text.matchAll(/https?:\/\/[^\s<>"']+/g)].map((match) => match[0]);
}

function stripTrailingPunctuation(rawUrl) {
  if (!options.trimPunctuation.checked) return { url: rawUrl, suffix: "" };
  const match = rawUrl.match(/[),.;!?]+$/);
  if (!match) return { url: rawUrl, suffix: "" };
  return {
    url: rawUrl.slice(0, -match[0].length),
    suffix: match[0],
  };
}

function cleanUrl(rawUrl) {
  const { url: trimmedUrl, suffix } = stripTrailingPunctuation(rawUrl);
  const url = new URL(trimmedUrl);
  let removed = 0;

  if (options.removeTracking.checked) {
    [...url.searchParams.keys()].forEach((key) => {
      if (trackingParameters.has(key.toLowerCase())) {
        url.searchParams.delete(key);
        removed += 1;
      }
    });
  }

  if (options.sortParams.checked) {
    const sorted = [...url.searchParams.entries()].sort(([a], [b]) => a.localeCompare(b));
    url.search = "";
    sorted.forEach(([key, value]) => url.searchParams.append(key, value));
  }

  return {
    cleaned: `${url.toString()}${suffix}`,
    removed,
  };
}

function cleanLinks() {
  const text = inputUrl.value;
  const urls = extractUrls(text);
  let removedCount = 0;

  if (!text.trim()) {
    outputUrl.value = "";
    summaryLinks.textContent = "0";
    summaryParams.textContent = "0";
    statusMessage.textContent = "Paste a link to clean.";
    return;
  }

  const cleanedText = text.replace(/https?:\/\/[^\s<>"']+/g, (rawUrl) => {
    try {
      const result = cleanUrl(rawUrl);
      removedCount += result.removed;
      return result.cleaned;
    } catch {
      return rawUrl;
    }
  });

  outputUrl.value = cleanedText;
  summaryLinks.textContent = urls.length.toLocaleString();
  summaryParams.textContent = removedCount.toLocaleString();
  statusMessage.textContent = urls.length ? "Cleaned links are ready." : "No valid links found.";
}

async function copyOutput() {
  if (!outputUrl.value) {
    statusMessage.textContent = "Nothing to copy yet.";
    return;
  }

  try {
    await navigator.clipboard.writeText(outputUrl.value);
    statusMessage.textContent = "Copied to clipboard.";
  } catch {
    outputUrl.select();
    document.execCommand("copy");
    statusMessage.textContent = "Copied using browser fallback.";
  }
}

document.querySelector("#sampleButton").addEventListener("click", () => {
  inputUrl.value = sampleText;
  cleanLinks();
});

document.querySelector("#cleanButton").addEventListener("click", cleanLinks);
document.querySelector("#copyButton").addEventListener("click", copyOutput);
Object.values(options).forEach((option) => option.addEventListener("change", cleanLinks));

cleanLinks();

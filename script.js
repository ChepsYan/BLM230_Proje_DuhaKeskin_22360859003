let encodedData = [];
let memoryData = [];
let errorPosition = -1;

function calculateParityBits(dataBits) {
  let r = 0;
  while (Math.pow(2, r) < dataBits + r + 1) {
    r++;
  }
  return r + 1;
}

function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

function createHammingCode(data) {
  const dataBits = data.length;
  const parityBits = calculateParityBits(dataBits);
  const totalBits = dataBits + parityBits;

  let hammingCode = new Array(totalBits).fill(0);
  let dataIndex = 0;

  for (let i = 1; i <= totalBits - 1; i++) {
    if (!isPowerOfTwo(i)) {
      hammingCode[i - 1] = parseInt(data[dataIndex]);
      dataIndex++;
    }
  }

  for (let i = 0; i < parityBits - 1; i++) {
    let parityPos = Math.pow(2, i);
    let parity = 0;

    for (let j = parityPos; j <= totalBits - 1; j++) {
      if ((j & parityPos) === parityPos) {
        parity ^= hammingCode[j - 1];
      }
    }

    hammingCode[parityPos - 1] = parity;
  }

  let overallParity = 0;
  for (let i = 0; i < totalBits - 1; i++) {
    overallParity ^= hammingCode[i];
  }
  hammingCode[totalBits - 1] = overallParity;

  return hammingCode;
}

function encodeData() {
  const bitSize = parseInt(document.getElementById("bitSize").value);
  const dataInput = document.getElementById("dataInput").value.trim();

  if (!dataInput || !/^[01]+$/.test(dataInput)) {
    showNotification("Lütfen geçerli bir binary veri girin!", "error");
    return;
  }

  if (dataInput.length !== bitSize) {
    showNotification(`Lütfen ${bitSize} bitlik bir veri girin!`, "error");
    return;
  }

  const button = event.target;
  button.innerHTML = '🔐 İşleniyor... <span class="loading"></span>';
  button.disabled = true;

  setTimeout(() => {
    encodedData = createHammingCode(dataInput);
    displayEncodedData();

    document.getElementById("encodedSection").style.display = "block";
    document.getElementById("memorySection").style.display = "none";
    document.getElementById("checkSection").style.display = "none";

    button.innerHTML = "🔐 Hamming Kodu Oluştur";
    button.disabled = false;

    showNotification("Hamming kodu başarıyla oluşturuldu!", "success");
  }, 500);
}

function displayEncodedData() {
  const display = document.getElementById("encodedDisplay");
  display.innerHTML = "";

  encodedData.forEach((bit, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "bit-wrapper";

    const bitElement = document.createElement("div");
    bitElement.className = "bit tooltip";
    bitElement.textContent = bit;
    bitElement.setAttribute("data-tooltip", `Pozisyon ${index + 1}`);

    if (isPowerOfTwo(index + 1) || index === encodedData.length - 1) {
      bitElement.classList.add("parity");
    } else {
      bitElement.classList.add("data");
    }

    if (index === errorPosition) {
      bitElement.classList.add("error");
    }

    bitElement.onclick = () => toggleBit(index);

    wrapper.appendChild(bitElement);

    const label = document.createElement("div");
    label.className = "bit-label";
    label.textContent = index + 1;
    wrapper.appendChild(label);

    display.appendChild(wrapper);

    wrapper.style.opacity = "0";
    wrapper.style.transform = "translateY(20px)";
    setTimeout(() => {
      wrapper.style.transition = "all 0.3s ease";
      wrapper.style.opacity = "1";
      wrapper.style.transform = "translateY(0)";
    }, index * 30);
  });

  document.getElementById("encodedValue").textContent = encodedData.join("");

  const dataBitsCount = encodedData.filter(
    (_, i) => !isPowerOfTwo(i + 1) && i !== encodedData.length - 1
  ).length;
  const parityBitsCount = encodedData.length - dataBitsCount;

  document.getElementById("dataBitsCount").textContent = dataBitsCount;
  document.getElementById("parityBitsCount").textContent = parityBitsCount;
  document.getElementById("totalBitsCount").textContent = encodedData.length;
}

function toggleBit(index) {
  if (memoryData.length > 0) {
    memoryData[index] = memoryData[index] === 0 ? 1 : 0;
    errorPosition = index;
    displayMemoryData();
    showNotification(`Bit ${index + 1} değiştirildi!`, "info");
  }
}

function introduceError() {
  if (encodedData.length === 0) return;

  const randomIndex = Math.floor(Math.random() * encodedData.length);
  encodedData[randomIndex] = encodedData[randomIndex] === 0 ? 1 : 0;
  errorPosition = randomIndex;

  displayEncodedData();
  showNotification(
    `Bit ${randomIndex + 1} pozisyonunda hata oluşturuldu!`,
    "error"
  );
}

function saveToMemory() {
  const button = event.target;
  button.innerHTML = '💾 Kaydediliyor... <span class="loading"></span>';
  button.disabled = true;

  setTimeout(() => {
    memoryData = [...encodedData];
    displayMemoryData();
    document.getElementById("memorySection").style.display = "block";

    button.innerHTML = "💾 Belleğe Kaydet";
    button.disabled = false;

    showNotification("Veri belleğe kaydedildi!", "success");
  }, 500);
}

function displayMemoryData() {
  const content = document.getElementById("memoryContent");
  content.innerHTML = '<div class="bit-display">';

  const display = content.querySelector(".bit-display");

  memoryData.forEach((bit, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "bit-wrapper";

    const bitElement = document.createElement("div");
    bitElement.className = "bit tooltip";
    bitElement.textContent = bit;
    bitElement.setAttribute(
      "data-tooltip",
      `Pozisyon ${index + 1} - Değiştirmek için tıklayın`
    );

    if (isPowerOfTwo(index + 1) || index === memoryData.length - 1) {
      bitElement.classList.add("parity");
    } else {
      bitElement.classList.add("data");
    }

    if (index === errorPosition) {
      bitElement.classList.add("error");
    }

    bitElement.onclick = () => toggleBit(index);

    wrapper.appendChild(bitElement);

    const label = document.createElement("div");
    label.className = "bit-label";
    label.textContent = index + 1;
    wrapper.appendChild(label);

    display.appendChild(wrapper);
  });

  content.innerHTML += `<div class="result"><strong>💾 Bellek İçeriği:</strong> ${memoryData.join(
    ""
  )}</div>`;
}

function readFromMemory() {
  if (memoryData.length === 0) {
    showNotification("Bellekte veri yok!", "error");
    return;
  }

  const button = event.target;
  button.innerHTML = '🔍 Kontrol ediliyor... <span class="loading"></span>';
  button.disabled = true;

  setTimeout(() => {
    const syndrome = calculateSyndrome(memoryData);
    displaySyndromeCheck(syndrome);

    document.getElementById("checkSection").style.display = "block";

    button.innerHTML = "🔍 Bellekten Oku ve Kontrol Et";
    button.disabled = false;
  }, 800);
}

function calculateSyndrome(data) {
  const parityBits = Math.floor(Math.log2(data.length)) + 1;
  let syndrome = 0;

  for (let i = 0; i < parityBits - 1; i++) {
    let parityPos = Math.pow(2, i);
    let parity = 0;

    for (let j = parityPos; j <= data.length - 1; j++) {
      if ((j & parityPos) === parityPos) {
        parity ^= data[j - 1];
      }
    }

    if (parity !== 0) {
      syndrome += parityPos;
    }
  }

  let overallParity = 0;
  for (let i = 0; i < data.length; i++) {
    overallParity ^= data[i];
  }

  return { syndrome, overallParity };
}

function displaySyndromeCheck(result) {
  const checkResult = document.getElementById("checkResult");
  let html = "";

  html += `<strong>🔢 Sendrom:</strong> ${result.syndrome
    .toString(2)
    .padStart(4, "0")} (Decimal: ${result.syndrome})<br>`;
  html += `<strong>🔍 Genel Parity:</strong> ${result.overallParity}<br><br>`;

  if (result.syndrome === 0 && result.overallParity === 0) {
    html +=
      '<div class="success-message">✅ Hata tespit edilmedi! Veri güvenli.</div>';
  } else if (result.syndrome !== 0 && result.overallParity === 1) {
    html += `<div class="error-message">⚠️ Tek bit hatası tespit edildi! Pozisyon: ${result.syndrome}</div>`;

    const correctedData = [...memoryData];
    correctedData[result.syndrome - 1] =
      correctedData[result.syndrome - 1] === 0 ? 1 : 0;

    html += `<div class="success-message">✅ Hata başarıyla düzeltildi!</div>`;
    html += `<strong>🔧 Düzeltilmiş Veri:</strong> ${correctedData.join("")}`;
  } else if (result.syndrome === 0 && result.overallParity === 1) {
    html +=
      '<div class="error-message">⚠️ Genel parity bitinde hata tespit edildi!</div>';
  } else {
    html +=
      '<div class="error-message">❌ Çift bit hatası tespit edildi! (Düzeltilemiyor)</div>';
  }

  checkResult.innerHTML = html;
}

function showNotification(message, type) {
  console.log(`[${type}] ${message}`);
}

function clearAll() {
  document.getElementById("dataInput").value = "";
  encodedData = [];
  memoryData = [];
  errorPosition = -1;

  document.getElementById("encodedSection").style.display = "none";
  document.getElementById("memorySection").style.display = "none";
  document.getElementById("checkSection").style.display = "none";

  showNotification("Tüm veriler temizlendi!", "info");
}

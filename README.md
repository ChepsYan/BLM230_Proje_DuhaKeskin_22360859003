# Hamming SEC-DED Code Simülatörü

Duha KESKİN - 22360859003  
**Bilgisayar Mimarisi (BLM230)**

## 📋 İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Teorik Altyapı](#teorik-altyapı)
- [Özellikler](#özellikler)
- [Dosya Yapısı](#dosya-yapısı)
- [Kurulum ve Kullanım](#kurulum-ve-kullanım)
- [Algoritma Detayları](#algoritma-detayları)
- [Teknik Implementasyon](#teknik-implementasyon)
- [Test Senaryoları](#test-senaryoları)
- [Görsel Arayüz](#görsel-arayüz)

## 🎯 Proje Hakkında

Bu proje, **Hamming SEC-DED (Single Error Correction - Double Error Detection)** kodlama sisteminin interaktif bir simülatörüdür. Bilgisayar mimarisi dersinde öğrenilen hata düzeltme kodlarının pratik uygulamasını görselleştirmek ve anlamak için geliştirilmiştir.

### Amaç

- Hamming kodlama algoritmasının işleyişini görselleştirmek
- Tek bit hatalarının nasıl tespit edilip düzeltildiğini göstermek
- Çift bit hatalarının nasıl tespit edildiğini anlatmak
- Bellek sistemlerinde hata kontrolünün önemini vurgulamak

## 📚 Teorik Altyapı

### Hamming Kodu Nedir?

Hamming kodu, 1950 yılında Richard Hamming tarafından geliştirilmiş bir hata düzeltme kodudur. Bu kod:

- **Tek bit hatalarını** tespit edip düzeltebilir
- **Çift bit hatalarını** tespit edebilir (ancak düzeltemez)
- Minimum sayıda redundant bit (parity bit) kullanır

### SEC-DED (Single Error Correction - Double Error Detection)

SEC-DED sistemi, standart Hamming koduna ek bir **genel parity biti** ekleyerek çift bit hatalarını da tespit edebilir hale getirir.

### Parity Bit Hesaplama

n-bit veri için gerekli parity bit sayısı (r):

```
2^r ≥ n + r + 1
```

### Bit Konumlandırma

- **Parity bitleri:** 2'nin kuvveti pozisyonlarda (1, 2, 4, 8, 16, ...)
- **Veri bitleri:** Diğer pozisyonlarda (3, 5, 6, 7, 9, 10, ...)
- **Genel parity biti:** Son pozisyonda

## ✨ Özellikler

### 🔧 Temel Fonksiyonlar

- **Otomatik Hamming Kodlama:** Girilen binary veriyi otomatik olarak Hamming koduna dönüştürür
- **Görsel Bit Gösterimi:** Her bit renkli kutular halinde gösterilir
- **Interaktif Hata Simülasyonu:** Bitlere tıklayarak manuel hata oluşturabilirsiniz
- **Otomatik Hata Üretimi:** Rastgele pozisyonda hata oluşturma özelliği
- **Bellek Simülasyonu:** Kodlanmış verinin belleğe kaydedilmesi ve okunması
- **Sendrom Hesaplama:** Hata tespiti için sendrom hesaplama
- **Otomatik Hata Düzeltme:** Tespit edilen tek bit hatalarını otomatik düzeltme

### 🎨 Görsel Özellikler

- **Responsive Tasarım:** Tüm cihazlarda uyumlu çalışır
- **Animasyonlar:** Smooth geçişler ve etkileşimli animasyonlar
- **Renk Kodlaması:**
  - 🔵 Mavi: Veri bitleri
  - 🟣 Mor: Parity bitleri
  - 🔴 Kırmızı: Hatalı bitler
- **Modern UI/UX:** Glassmorphism tasarım prensiplerine uygun arayüz

## 📁 Dosya Yapısı

```
BLM230_Proje_DuhaKeskin_22360859003/
├── index.html              # Ana HTML dosyası
├── styles.css              # CSS stil dosyası
├── script.js               # JavaScript fonksiyonları
├── README.md               # Proje dokümantasyonu
```

### Dosya Detayları

#### `index.html`

- HTML5 semantic yapısı
- Modern meta etiketleri
- External CSS ve JS dosyalarına referanslar
- Responsive viewport ayarları

#### `styles.css`

- CSS3 modern özellikleri (Grid, Flexbox, Animations)
- Custom properties (CSS variables)
- Responsive breakpoints
- Glassmorphism effects
- Smooth animations ve transitions

#### `script.js`

- ES6+ JavaScript özellikleri
- Modüler fonksiyon yapısı
- Comprehensive error handling
- JSDoc dokümantasyonu
- Event-driven programming

## 🚀 Kurulum ve Kullanım

### Sistem Gereksinimleri

- Modern web tarayıcısı (Chrome 80+, Firefox 75+, Safari 13+)
- JavaScript'in etkin olması
- Minimum 1024x768 ekran çözünürlüğü (önerilen)

### Kurulum Adımları

1. Projeyi bilgisayarınıza indirin veya klonlayın
2. `index.html` dosyasını web tarayıcısında açın
3. Tüm dosyaların aynı klasörde olduğundan emin olun

### Kullanım Kılavuzu

#### 1. Veri Girişi

- **Bit Sayısı Seçin:** 8, 16, veya 32 bit seçeneklerinden birini seçin
- **Binary Veri Girin:** Sadece 0 ve 1 karakterleri kabul edilir
- **Hamming Kodu Oluştur:** Butona tıklayarak kodlama işlemini başlatın

#### 2. Kodlanmış Veri İnceleme

- Renkli bitler halinde kodlanmış veriyi görüntüleyin
- İstatistikleri inceleyin (veri bit sayısı, parity bit sayısı, toplam bit)
- İsterseniz yapay hata ekleyin

#### 3. Bellek Simülasyonu

- Veriyi belleğe kaydedin
- Bellekteki bitleri tıklayarak değiştirin (hata simülasyonu)
- Bellek içeriğini görüntüleyin

#### 4. Hata Kontrolü

- Bellekten veri okuyun
- Sendrom hesaplama sonuçlarını inceleyin
- Hata tipini ve konumunu öğrenin
- Düzeltilmiş veriyi görüntüleyin

## 🔬 Algoritma Detayları

### Hamming Kodlama Algoritması

#### 1. Parity Bit Sayısı Hesaplama

```javascript
function calculateParityBits(dataBits) {
  let r = 0;
  while (Math.pow(2, r) < dataBits + r + 1) {
    r++;
  }
  return r + 1; // +1 genel parity biti için
}
```

#### 2. Veri Bit Yerleştirme

- 2'nin kuvveti olmayan pozisyonlara veri bitleri yerleştirilir
- Pozisyon 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, ...

#### 3. Parity Bit Hesaplama

Her parity biti, belirli pozisyonlardaki bitlerin XOR'unu alır:

- P1 (pos 1): 1, 3, 5, 7, 9, 11, 13, 15, ...
- P2 (pos 2): 2, 3, 6, 7, 10, 11, 14, 15, ...
- P4 (pos 4): 4, 5, 6, 7, 12, 13, 14, 15, ...
- P8 (pos 8): 8, 9, 10, 11, 12, 13, 14, 15, ...

#### 4. Genel Parity Biti

Tüm bitlerin (veri + parity) XOR'u alınır.

### Hata Tespit ve Düzeltme Algoritması

#### 1. Sendrom Hesaplama

```javascript
function calculateSyndrome(data) {
  let syndrome = 0;
  // Her parity biti için kontrol
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
  return syndrome;
}
```

#### 2. Hata Tiplerinin Belirlenmesi

| Sendrom | Genel Parity | Durum                           |
| ------- | ------------ | ------------------------------- |
| 0       | 0            | Hata yok                        |
| 0       | 1            | Genel parity bitinde hata       |
| ≠0      | 1            | Tek bit hatası (düzeltilebilir) |
| ≠0      | 0            | Çift bit hatası (sadece tespit) |

## 💻 Teknik Implementasyon

### JavaScript Mimarisi

#### Global Değişkenler

```javascript
let encodedData = []; // Kodlanmış veri dizisi
let memoryData = []; // Bellekteki veri
let errorPosition = -1; // Hata pozisyonu
```

#### Ana Fonksiyonlar

##### `encodeData()`

- Kullanıcı girişini doğrular
- Hamming kodlama algoritmasını çalıştırır
- Sonuçları görselleştirir

##### `displayEncodedData()`

- Bitleri renkli kutular halinde gösterir
- Tooltip'ler ile etkileşim sağlar
- Animasyonlu görüntüleme

##### `calculateSyndrome()`

- Hata tespiti için sendrom hesaplar
- Genel parity kontrolü yapar
- Hata tipini belirler

##### `displaySyndromeCheck()`

- Sendrom sonuçlarını görselleştirir
- Hata düzeltme işlemini yapar
- Kullanıcıya geri bildirim verir

### CSS Tasarım Prensipleri

#### Glassmorphism Effect

```css
.container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}
```

#### Responsive Design

```css
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
  .input-group {
    flex-direction: column;
  }
  .bit {
    width: 40px;
    height: 40px;
  }
}
```

#### CSS Animations

- `fadeInUp`: Bölümler için yukarıdan kayma animasyonu
- `pulse`: Hatalı bitler için nabız animasyonu
- `shake`: Hata mesajları için sallama animasyonu
- `spin`: Loading animasyonu

## 🧪 Test Senaryoları

### Test 1: 8-Bit Veri Kodlama

**Giriş:** `10110010`
**Beklenen Çıkış:** `001101100101` (12 bit)
**Test Edilen:** Temel kodlama algoritması

### Test 2: Tek Bit Hata Tespiti

**Senaryo:** Pozisyon 3'teki biti değiştir
**Beklenen Sonuç:** Sendrom = 3, hata düzeltilmeli

### Test 3: Çift Bit Hata Tespiti

**Senaryo:** İki farklı biti değiştir
**Beklenen Sonuç:** Çift bit hatası tespit edilmeli

### Test 4: Genel Parity Hata

**Senaryo:** Sadece son biti değiştir
**Beklenen Sonuç:** Genel parity hatası tespit edilmeli

### Test 5: Büyük Veri (32-bit)

**Giriş:** 32-bitlik rastgele veri
**Test Edilen:** Algoritmanın ölçeklenebilirliği

## 🎨 Görsel Arayüz

### Renk Paleti

- **Primary:** `#667eea` → `#764ba2` (Gradient)
- **Success:** `#38a169` (Yeşil tonları)
- **Error:** `#e53e3e` (Kırmızı tonları)
- **Warning:** `#f687b3` (Pembe tonları)
- **Info:** `#4299e1` (Mavi tonları)

### Typography

- **Font Family:** System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI')
- **Heading:** 3em, bold weight
- **Body:** 1.1em, normal weight
- **Code:** Monospace, smaller size

### Layout Principles

- **Container:** Max-width 1200px, centered
- **Sections:** Card-based layout, rounded corners
- **Spacing:** Consistent 20px/30px grid system
- **Interactive Elements:** Hover effects, smooth transitions

## 🔧 Geliştirme Notları

### Kod Kalitesi

- **ESLint/JSDoc:** Comprehensive documentation
- **Clean Code:** Meaningful variable names, single responsibility
- **Error Handling:** Comprehensive input validation
- **Performance:** Efficient algorithms, minimal DOM manipulation

### Browser Compatibility

- **Modern Browsers:** Chrome 80+, Firefox 75+, Safari 13+
- **Fallbacks:** Graceful degradation for older browsers
- **Progressive Enhancement:** Core functionality works without JS

### Accessibility

- **Semantic HTML:** Proper heading structure, labels
- **Keyboard Navigation:** Tab order, focus management
- **Color Contrast:** WCAG 2.1 AA compliance
- **Screen Readers:** ARIA labels where needed

## 📈 Performans Optimizasyonları

### JavaScript

- **Event Delegation:** Efficient event handling
- **Debouncing:** Input validation optimization
- **Memory Management:** Proper cleanup of event listeners

### CSS

- **Hardware Acceleration:** transform3d() for animations
- **Efficient Selectors:** Minimal specificity, performance-focused
- **Critical CSS:** Above-the-fold optimization

## 🔍 Hata Ayıklama

### Yaygın Sorunlar

#### "Hata tespit edilmedi" Mesajı

- **Sebep:** Veri doğru kodlanmış, hata yok
- **Çözüm:** Manuel olarak bit değiştirerek test edin

#### Çift Bit Hatası False Positive

- **Sebep:** Genel parity biti hesaplama hatası
- **Çözüm:** Algoritma implementasyonunu kontrol edin

#### Görsel Bozukluklar

- **Sebep:** CSS dosyası yüklenememiş
- **Çözüm:** Dosya yollarını kontrol edin

### Debug Modu

Console'da aşağıdaki komutları kullanabilirsiniz:

```javascript
console.log(encodedData); // Kodlanmış veriyi görüntüle
console.log(memoryData); // Bellek içeriğini görüntüle
console.log(errorPosition); // Hata pozisyonunu görüntüle
```

## 📚 Referanslar ve Kaynaklar

### Akademik Kaynaklar

1. Hamming, R.W. (1950). "Error detecting and error correcting codes"
2. Peterson, W.W. & Brown, D.T. (1961). "Cyclic codes for error detection"
3. Lin, S. & Costello, D.J. (2004). "Error Control Coding"

### Online Kaynaklar

- [Wikipedia: Hamming Code](https://en.wikipedia.org/wiki/Hamming_code)
- [MIT OpenCourseWare: Error Correction](https://ocw.mit.edu)
- [Computer Architecture: A Quantitative Approach](https://www.elsevier.com)

### Teknik Dokümantasyonlar

- [MDN Web Docs](https://developer.mozilla.org)
- [W3C Specifications](https://www.w3.org)
- [ECMAScript Language Specification](https://tc39.es/ecma262/)

---

**© 2024 - Duha KESKİN - Bilgisayar Mimarisi Projesi**

Bu proje, akademik amaçlar için geliştirilmiştir ve Hamming SEC-DED kodlama algoritmasının eğitim amaçlı implementasyonunu içermektedir.

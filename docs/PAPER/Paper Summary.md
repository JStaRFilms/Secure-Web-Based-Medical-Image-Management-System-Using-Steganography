**"A Comparative Computational Efficiency Analysis of LSB and Hybrid Steganographic Methods"** Authors: Divya Sharma and Chander Prabha Year: 2025

Objective:

- The primary goal is to perform a comparative study between Least Significant Bit (LSB) steganography and a proposed Hybrid Method (HM) focusing specifically on reducing computational time.
- The researchers aim to secure Electronic Medical Images (EMI) such as X-rays while ensuring they remain accessible for real-time transmission and storage.
- The study evaluates performance through metrics including Mean Square Error (MSE), Peak Signal to Noise Ratio (PSNR), and Structural Similarity Index Metrics (SSIM).

Motivation:

- Advances in smart city technology and the Internet have increased the need for real-time access to patient records, yet securing large medical images like MRIs and CT scans remains a challenge.
- Existing research has often overlooked the need to balance high security for sensitive medical data with the speed required for medical emergencies where every second counts.
- Standard LSB methods, while simple to implement, often suffer from limited embedding capacity and high computational complexity when dealing with large datasets.

Methodology:

- The study uses a dataset of 5,856 greyscale secret Chest X-ray images normalized to a 500-row dimension while maintaining aspect ratios.
- For the Hybrid Method (HM), the authors apply Edge-Based Steganography (EBS) followed by five distinct layers of cryptography: initial permutation, circular right shift, XOR, even-odd interchange, and final permutation.
- The LSB method is implemented separately on the same dataset for direct comparison, using MATLAB as the primary programming environment.

Contribution:

- The research demonstrates that the HM is significantly more efficient than LSB, taking only 0.0117 seconds for encryption compared to 5.916 minutes for LSB.
- It provides a comprehensive discussion of data hiding techniques focused on EMI and includes a tabular analysis of previous literature.
- The results indicate that HM is more practical for real-time applications (RTA) in healthcare due to its reduced computational time and high SSIM value of 1.

Limitations:

- The study focuses primarily on 2-D greyscale images, leaving 3-D medical images (like CT and MRI) and colored medical imagery for future extensions.
- The current framework does not incorporate continuous feedback mechanisms to improve the technique in real-time based on fluctuating network conditions.

**"Patient consent for the secondary use of health data in artificial intelligence (AI) models: A scoping review"** Authors: Khadijeh Moulaei, Saeed Akhlaghpour, and Farhad Fatehi Year: 2025

Objective:

- The study aims to examine current patient consent practices regarding the utilization of health data for training AI models.
- The researchers intend to identify the core barriers and facilitators related to privacy, security, and ethics in this domain.

Motivation:

- While the secondary use of health data offers immense potential for medical research, maintaining ethical standards and data privacy is paramount to upholding public trust.
- The emergence of large language models (LLMs) in healthcare creates new risks of unauthorized data sharing and inadequacies in informed consent processes.

Methodology:

- A scoping review was conducted by searching Web of Science, PubMed, and Scopus for English-language articles.
- After screening 774 articles, 38 relevant articles were selected for data extraction and thematic categorization.
- Findings were consolidated into four themes: "Structure," "People," "Physical system," and "Task".

Contribution:

- The review identified 178 unique barriers and 193 facilitators related to patient consent for AI data usage.
- It emphasizes the critical need for establishing a "social license" beyond formal legal frameworks to foster societal acceptance of medical AI.
- The study highlights that anonymization and promoting ethical standards are key facilitators for data usage.

Limitations:

- The search was restricted to articles published in English, potentially omitting relevant findings from non-English speaking regions.
- The review process notes that many studies lack quantifiable data by race/ethnicity, making it difficult to assess demographic equity in AI training datasets.

**"MalDicom: A Memory Forensic Framework for Detecting Malicious Payload in DICOM Files"** Authors: Ayushi Mishra and Priyanka Bagade Year: [Year not found in text] (References date to 2022)

Objective:

- The research focuses on detecting malicious executables hidden within the 128-byte preamble section of DICOM files.
- The authors aim to develop a memory forensic framework, "MalDicom," to classify malware variants (Trojan, Spyware, Ransomware) from system memory dumps.

Motivation:

- DICOM files are widely used for medical image portability but contain vulnerabilities in the header preamble that allow code injection without affecting image readability.
- Attackers can use these files to silently infect hospital networks, bypassing traditional scanners that often ignore DICOM traffic.

Methodology:

- The researchers simulate a man-in-the-middle (MITM) attack to inject malicious payloads into DICOM files.
- They utilize Machine Learning (ML) algorithms, specifically Random Forest, Decision Trees, and SVM, to analyze memory dumps from the CIC-MalMem-2022 dataset.
- Shapley values are used to provide explainability for the ML model's predictions.

Contribution:

- The study obtains a peak classification accuracy of 75% using the Random Forest model for detecting malware in memory dumps.
- It demonstrates how malicious payloads can hide behind HIPAA-compliant files to disrupt hospital operations.
- The paper suggests that entropy-based scanning could be a constant-time alternative for future malware detection in preambles.

Limitations:

- The ML-based forensic investigation is identified as time-consuming and computationally expensive for real-time deployment.
- The study focuses on Windows-based malware executables, and the effectiveness against other operating systems is not explicitly detailed.

**"Image steganalysis using LSTM fused convolutional neural networks for secure telemedicine"** Authors: Doaa Shehab and Mohmmed Alhaddad Year: 2025

Objective:

- The goal is to develop a robust AI-driven steganalysis tool to detect hidden data within medical images to preserve patient privacy.
- The study seeks to create a lightweight framework that prioritizes detection accuracy while remaining resource-efficient.

Motivation:

- Medical images often contain embedded metadata or annotations that could be manipulated by malicious actors to alter tumor regions or steal patient records.
- Recent deep learning advancements in steganalysis have focused on accuracy but often result in high-parameter models that are difficult to scale for real-time telemedicine.

Methodology:

- The authors propose a hybrid architecture where the fully connected layers of a standard CNN are replaced with Long Short-Term Memory (LSTM) nodes.
- They use five different steganographic algorithms (S-UNIWARD, WOW, JMiPOD, JUNIWARD, UERD) to embed noise into cover images for testing.
- The model is trained and validated on the BOSSBase 1.01, BOWS, and ALASKA2 datasets using Python and TensorFlow.

Contribution:

- The hybrid CNN-LSTM model significantly reduces the number of trainable parameters, making it more efficient than leading architectures like Zhu-Net or Yedroudj-Net.
- The research demonstrates that LSTM layers can better capture and rank correlations between different types of stego-noise in high-frequency residuals.
- The approach shows strong generalization capabilities across diverse datasets, which is vital for secure medical image transmission.

Limitations:

- While the model is lightweight, the study notes that weaker or cost-optimized underlying models might still underperform against extremely subtle signal detection tasks.
- The focus is primarily on vision-only steganalysis, and the framework does not yet integrate multimodal features such as clinical text or genomic data.

**"An autonomous agent for auditing and improving the reliability of clinical AI models"** Authors: [Detail not found] (Preprint on arXiv; References to Claude 3.7 context) Year: [Year not found in text] (Contextual data suggests 2025)

Objective:

- The paper introduces "ModelAuditor," an autonomous agent designed to conduct comprehensive reliability evaluations of trained clinical AI vision models.
- It aims to enable practitioners to understand failure modes through clinically interpretable natural-language reports.

Motivation:

- There is a significant "reliability gap" between AI models trained in controlled settings and their performance in real-world clinical environments.
- Existing evaluation methods often fail to capture clinical risk or real-world variability such as device-related distribution shifts.

Methodology:

- The framework is built using the Claude 3.7 Sonnet large language model as a single high-capacity agent.
- The agent uses a multi-agent "debate" phase to select the best evaluation metrics (based on MetricsReloaded) and real-world perturbations (e.g., JPEG artifacts, rotations).
- The system executes hundreds of perturbation-evaluation cycles on datasets like Camelyon17 and HAM10000 to generate an executive report.

Contribution:

- The agent provides a cost-effective audit solution, costing less than $0.50 per comprehensive evaluation.
- Experimental results show that the agent's metric selections overlap 100% with independent domain-expert choices.
- The work provides a tool for identifying disparities in model performance across different medical imaging device vendors.

Limitations:

- The framework is currently restricted to vision-only models and cannot yet audit multimodal models that fuse imaging with text or genomics.
- Simulated shifts may not capture the full range of real-world "in-the-wild" variability.

**"Invisible Injections: Exploiting Vision-Language Models Through Steganographic Prompt Embedding"** Authors: Chetan Pathade Year: [Year not found in text] (References date to 2025)

Objective:

- The research presents the first study on steganographic prompt injection attacks against Vision-Language Models (VLMs).
- The goal is to demonstrate how malicious instructions can be invisibly embedded in images to manipulate model behavior covertly.

Motivation:

- VLMs like GPT-4V and Claude are increasingly used in sensitive areas like medical image analysis and surgical decision support.
- Traditional adversarial attacks focus on misclassification, but steganographic prompt embedding creates a new threat where the model executes hidden commands.

Methodology:

- The author develops a multi-domain embedding framework that combines spatial (LSB), frequency (DCT), and neural steganographic methods.
- The attack is evaluated across 12 datasets and 8 state-of-the-art VLMs, including GPT-4V, Claude 3.5 Sonnet, and LLaVA-1.5.
- Success is measured by "Extractability" (behavioral change consistent with the hidden prompt) and "Imperceptibility" (PSNR and SSIM).

Contribution:

- The study reveals an overall attack success rate of 24.3%, with neural steganography methods reaching up to 31.8% success.
- It demonstrates that current VLM architectures can inadvertently extract and execute prompts during normal image processing.
- Practical defense mechanisms, such as cross-modal anomaly detection, are proposed to mitigate these threats.

Limitations:

- The overall success rates reflect technical barriers to implementation and the challenging nature of prompt-level steganographic injection.
- The attack success rate is negatively correlated with prompt length, significantly dropping as prompts exceed 20 tokens.

**"IoT-Enabled Reversible Watermarking of Medical Images Using PCA and Hash-Based Signatures for Secure Smart Healthcare"** Authors: Pradeep Kumar Tripathi, Manoj Varshney, and Aditi Sharma Year: 2026 (Received 2025)

Objective:

- The study proposes a novel reversible watermarking technique to protect sensitive medical imaging data transmitted across IoT interconnected devices.
- The authors aim to ensure data integrity and diagnostic quality while allowing for the full restoration of the original image post-verification.

Motivation:

- The rise of the Internet of Medical Things (IoMT) has increased the risk of unauthorized data breaches and tampering.
- Traditional watermarking often causes irreversible distortions that can negatively impact a doctor's diagnostic assessment.

Methodology:

- The framework leverages Principal Component Analysis (PCA) for minimal distortion and reversible embedding.
- Hash-Based Signatures (HBS), specifically SHA-256 and SHA-512, are integrated for robust tamper detection in both ROI and non-ROI areas.
- The Discrete Wavelet Transform (DWT) is used to optimize compression and transformation for real-time IoT environments.

Contribution:

- The system achieves high imperceptibility (high PSNR) and full reversibility, allowing images to be restored without losing diagnostic value.
- It provides high detection accuracy (up to 100%) for various image manipulations like resizing, pixel modification, and compression.
- The method is specifically designed for low-power IoT hardware and edge sensors used in remote diagnostics.

Limitations:

- PSNR values drop as tampering intensity increases, though accuracy remains high.
- Future work is required to test robustness against evolving cyber threats that specifically target IoT healthcare systems.

**"Reversible data hiding in encrypted DICOM images with fixed and block-wise pixel prediction"** Authors: Remigiusz Martyniak and Mariusz Dzwonkowski Year: 2026 (Received 2025)

Objective:

- The research presents a high-capacity reversible data hiding method for encrypted DICOM images.
- The authors aim to address the unique challenges of 16-bit medical images to ensure both content confidentiality and perfect restoration.

Motivation:

- Sharing medical data with third parties requires removing Protected Health Information (PHI) to comply with HIPAA and GDPR.
- Existing methods for 8-bit images often provide limited embedding capacity or high complexity for real-time cloud-based medical applications.

Methodology:

- The method introduces a binary decomposition strategy to separate the 16-bit DICOM image into two complementary 8-bit components.
- Component one uses a "fixed prediction" (bit-flipping) mechanism, while component two uses "variable block-wise model-based prediction".
- Extended Run-Length Encoding (ERLE) and Huffman coding are used to compress the prediction error maps to increase capacity.

Contribution:

- The framework achieves embedding rates exceeding 10 bits-per-pixel (bpp) for DICOM images, outperforming many state-of-the-art schemes.
- It introduces 7 new prediction model variants and a refined reference-pixel scheme to enhance prediction accuracy.
- The study validates the approach using over 6,200 real 16-bit DICOM images.

Limitations:

- The current implementation results in high encryption and decryption times, which the authors plan to reduce in future work.
- The method's robustness may be affected if the auxiliary data arrangement is exposed to advanced cryptographic attacks.

**"BlessMark: A Blind Diagnostically-Lossless Watermarking Framework for Medical Applications Based on Deep Neural Networks"** Authors: Hamidreza Zarrabi, Ali Emami, Pejman Khadivi, Nader Karimi, and Shadrokh Samavi Year: [Year not found in text] (References date to 2019)

Objective:

- The authors propose a "BlessMark" framework for blind, diagnostically-lossless watermarking in medical applications.
- The goal is to hide patient info only in Non-Region-of-Interest (NROI) blocks to keep the diagnostic value of the ROI intact.

Motivation:

- Most existing ROI-based watermarking schemes require the ROI map to be sent as "side information," making the extraction process non-blind and less secure.
- Distortions in the ROI can cause serious misdiagnoses, necessitating a system where ROI remains perfectly preserved.

Methodology:

- A Deep Convolutional Neural Network (CNN) is used for the automated segmentation and generation of the ROI map.
- A three-layer fully connected neural network detects and recovers distorted NROI blocks after watermark extraction.
- The framework uses an iterative scheme to ensure the same ROI map is generated at both the transmitter and receiver sides without additional information.

Contribution:

- BlessMark is a truly blind system, requiring no original image or ROI map for information extraction.
- The proprietary weights of the neural network act as an extra layer of confidentiality for the ROI "key".
- The method produces zero "side information" compared to traditional lossless watermarking algorithms.

Limitations:

- The method is non-robust against geometric attacks that can alter the ROI map, as extraction depends on precise map alignment.
- The current evaluation is independent for different datasets; further cross-modality testing is suggested.

**"Blind Medical Image Watermarking Method Using Combined NSCT/2D-DCT Domains"** Authors: Ali Kouadri, Ali Benziane, Abdelhalim Rabehi, and Mohamed Lebcir Year: 2025

Objective:

- The research presents a blind watermarking framework that combines Non-Subsampled Contourlet Transform (NSCT) and 2D Discrete Cosine Transform (DCT).
- The aim is to embed patient metadata within low-frequency coefficients to ensure strong imperceptibility and robustness.

Motivation:

- Cloud-based healthcare sharing requires techniques to safeguard data authenticity, yet standard encryption loses protection once the file is decrypted.
- Single-transform methods often face an imbalance between robustness against image processing attacks and the visual quality of the medical image.

Methodology:

- The method uses NSCT decomposition to generate multiple sub-bands, increasing embedding capacity.
- A differential embedding technique is applied to transform sub-vectors extracted from low-frequency sub-bands.
- A secret key mechanism is used to determine the exact watermark embedding positions within the sub-vectors for added security.

Contribution:

- The NSCT/2D-DCT method shows an 18% increase in PSNR and a 38% improvement in Normalized Correlation (NC) compared to contemporary techniques.
- It demonstrates outstanding robustness against "challenging attacks" such as surrounding crop, Gaussian filtering, and speckle noise.
- The approach maintains high fidelity (PSNR 43–47 dB), significantly exceeding the standard 30 dB medical threshold.

Limitations:

- Noticeable performance degradation occurs under rotation attacks of 0.5° or more, particularly in CT and MRI scans.
- The method is currently non-reversible; future work will explore original image recovery.

**"Secure Offline: A Hardware-Bound Cryptographic Framework for Software License Validation in Internet Constrained Educational Environments"** Authors: Cephas Kalembo and Derick Ntalasha Year: 2025

Objective:

- The study proposes "Secure Offline," a cryptographic framework for software license validation without reliable internet access.
- The goal is to provide robust content protection in resource-constrained environments like Sub-Saharan Africa.

Motivation:

- Reliable internet access remains limited in many regions (only 28% broadband access in Sub-Saharan Africa), making cloud-dependent licensing systems impractical.
- Educational software often relies on offline-first models that are vulnerable to system clock manipulation and reverse engineering by local administrators.

Methodology:

- The framework uses "hardware fingerprinting" to bind software licenses to a specific physical device.
- It utilizes password-based key derivation (PBKDF2) and cryptographic protocols to ensure secure offline authentication.
- The architecture is modular, allowing for future integration with blockchain-based verification.

Contribution:

- Secure Offline provides a hardware-bound security model with minimal system impact (87.3ms activation time, 6.3 MB memory usage).
- The framework addresses the specific infrastructure constraints of diverse geographical regions, including rural schools with variable power supplies.
- It offers a scalable solution for sustainable educational technology advancement.

Limitations:

- The framework assumes the attacker has local administrative access, but its resilience against sophisticated hardware-level probing is not fully detailed.
- Initial deployment requires specific hardware configurations to ensure accurate fingerprinting.

**"A Medical Image Watermarking Technique for Embedding EPR and Its Quality Assessment Using No-Reference Metrics"** Authors: Rupinder Kaur Year: 2013

Objective:

- The paper explores using digital watermarking as a quality indicator and for embedding Electronic Patient Record (EPR) data.
- The goal is to use a "binary mark" as a No-Reference (NR) quality metric to estimate image degradation blindly.

Motivation:

- The digitalization of medical information introduces risks of inappropriate use and easy manipulation in open networks.
- Conventional security measures can detect alterations but cannot accurately judge if the image quality still supports safe medical diagnosis.

Methodology:

- The method segments the medical image into ROI and non-ROI (RONI) parts.
- It applies a 3-level Discrete Wavelet Transform (DWT) to the ROI and Discrete Cosine Transform (DCT) to the non-ROI.
- A binary mark is embedded as a semi-fragile watermark that degrades at the same rate as the host image.

Contribution:

- The research allows for the blind estimation of image quality without needing the original image for comparison.
- It demonstrates that EPR data can be recovered exactly even if the image is subjected to JPEG compression down to a quality level of 30.
- The technique saves storage space and reduces bandwidth by embedding the EPR directly within the image.

Limitations:

- The EPR recovery is only exact if JPEG quality remains at 30 or above; data loss occurs with heavier compression.
- The method requires visible distortions to be kept at absolute zero, which limits the potential payload for complex watermarks.

**"A New Reversible and high capacity data hiding technique for E-healthcare applications"** Authors: Shabir A. Parah, Farhana Ahad, Javaid A. Sheikh, and G. M. Bhat Year: 2016

Objective:

- The study proposes a high-capacity reversible data hiding technique for medical images that allows for tamper detection and localization.
- The aim is to facilitate the safe transmission of EPRs in e-healthcare while ensuring host image recovery.

Motivation:

- Tampering during medical image transit can lead to incorrect tele-diagnosis, making content authentication vital.
- Standard LSB methods are vulnerable to removal/replacement attacks, necessitating more robust spatial-domain approaches.

Methodology:

- The authors use "Pixel to Block" (PTB) conversion as a computationally efficient alternative to interpolation for cover image generation.
- Data is embedded using Intermediate Significant Bit Substitution (ISBS) rather than standard LSB.
- A fragile watermark computed from block checksums (for 4x4 blocks) is used for tamper localization.

Contribution:

- The method supports reversibility while providing high-quality watermarked images for a "fairly high payload".
- The use of PTB conversion reduces the overall computational complexity, making the scheme suitable for real-time applications.
- It provides three tiers of security by using a Pseudorandom Address Vector (PAV) for embedding addresses.

Limitations:

- Experimental results show that while higher bit planes increase robustness, they also decrease the system's "fragility," making it harder to detect very subtle tampering.
- The initial performance on certain datasets might be disappointing without multiple training iterations.

**"A Reversible Data Hiding through Encryption Scheme for Medical Image Transmission Using AES Encryption with Key Scrambling"** Authors: Kandala Sree Rama Murthy and V. M. Manikandan Year: 2022

Objective:

- The goal is to design an RDH-through-encryption scheme for secure medical image transmission with a high embedding rate.
- The system aims to produce an encrypted image where clinical reports are embedded as part of the encryption process.

Motivation:

- Existing schemes often use stream-ciphers, which have several security flaws.
- Many current RDH methods use trained machine learning models for image recovery, which introduces significant training and sharing overhead.

Methodology:

- The proposed scheme uses AES encryption combined with Arnold key scrambling for enhanced security.
- The image is encrypted block-wise, and each block embeds a specific number of bits from the text data.
- The receiver extracts the clinical report and decrypts the medical image to its original state using a shared AES key.

Contribution:

- The approach achieves an embedding rate of 0.0539 bits-per-pixel (bpp), which is "much higher" than existing state-of-the-art approaches.
- The encrypted images have an entropy value of 7.999, indicating a very high amount of randomness and resistance to statistical analysis.
- It simplifies key sharing by using standard AES protocols rather than complex multiple-key schemes.

Limitations:

- The current image encryption and decryption times are "very high," limiting the method's use in time-critical environments.
- The scheme's efficacy depends on the smoothness measure of adjacent pixels, which may vary significantly across different imaging modalities.

**"Securing Healthcare Data by Combining Cryptography and Steganography to Enhance Confidentiality"** Authors: Sara Albatienh, Mohammed Al-Husainy, Muhannad A. Abu-Hashem, Hazem Abuoliem, Mohammad Bani-Hani, and Ghayth Al-Asad Year: 2025

Objective:

- The research proposes a hybrid pipeline that encrypts patient medical records (PMRs) and hides the ciphertext via LSB steganography in radiological covers.
- The authors aim to protect both the confidentiality and integrity of highly sensitive medical data.

Motivation:

- Digitization has increased the risk of data breaches through eavesdropping and watering hole attacks.
- Single-layer security (just encryption or just steganography) is often insufficient against modern, sophisticated medical data theft methods.

Methodology:

- The pipeline uses an RNG-seeded substitution–transposition stage for encryption.
- The seed is derived from a user password using SHA-512 XOR-folded to a 16-byte seed.
- Robustness is tested using JPEG compression (Q=90/70), Gaussian noise, and 10% image cropping.

Contribution:

- The study achieves high imperceptibility with an average PSNR of ~65.6 dB and strong cryptographic diffusion (NPCR ~99.71%).
- A key-sensitivity test confirmed that even a one-character change in the password (password vs. password+"1") results in total keystream independence.
- The scheme demonstrates "graceful degradation" under moderate noise and compression.

Limitations:

- The method is highly sensitive to spatial loss, such as cropping, which significantly impacts payload recovery.
- Security against large-scale offline guessing depends heavily on the initial password entropy rather than a work-factorized KDF.

**"A Survey on Patients Privacy Protection with Steganography and Visual Encryption"** Authors: Hussein K. Alzubaidy, Dhiah Al-Shammary, and Mohammed Hamzah Abed Year: [Year not found in text] (Preprint on arXiv; References date to 2021)

Objective:

- The survey discusses thirty different models for steganography and visual encryption designed to provide patient privacy protection.
- The researchers evaluate and compare model performance using the Peak-Signal-to-Noise-Ratio (PSNR).

Motivation:

- The rapid growth of the Internet has made medical images easy targets for tampering and unauthorized access.
- Identifying the most effective "powerful methods" for hiding confidential data is necessary for the future of telemedicine.

Methodology:

- The authors classify steganography into two domains: Spatial (LSB, MSB) and Frequency (DCT, DWT).
- They collect and analyze the "best PSNR results" from thirty publications, representing them in visual bar charts.

Contribution:

- The survey concludes that Frequency Hiding models using Discrete Cosine Transform (DCT) achieve the highest average PSNR (70.66 dB).
- It highlights the success of (k, n) Shamir’s secret sharing schemes for preventing unauthorized medical record disclosure.
- The paper provides a centralized resource for understanding the "state of the field" for novice researchers.

Limitations:

- Many reviewed models use only a few image samples (e.g., 5-10), which is insufficient to prove consistent real-world performance.
- Most models in the survey do not compute or clarify processing time, making it difficult to assess their viability for real-time systems.

**"AES, DES, and RSA in Data Security: A Review"** Authors: Sakshi Parekh and Mr Janak Maru Year: 2025

Objective:

- The paper provides a detailed comparison of standard cryptographic algorithms (AES, DES, RSA) based on performance, security, and efficiency.
- It evaluates both individual and hybrid forms (e.g., AES+DES+RSA) for solving modern data security challenges.

Motivation:

- Protecting data confidentiality and integrity is a major concern in the digital age.
- Legacy algorithms like DES are increasingly vulnerable, while powerful ones like RSA are inefficient for large data payloads.

Methodology:

- The review synthesizes empirical evidence from recent comparative studies on execution time, CPU/memory usage, and throughput.
- It uses a "Consensus statement" format to summarize strengths and weaknesses across multiple research articles.

Contribution:

- The study recommends AES-256 with authenticated modes (like GCM) as the modern standard for bulk data encryption.
- It clarifies that while triple-hybrid schemes (AES+DES+RSA) offer layered defense, they should be reserved for extreme threat domains (military/finance) due to complexity.
- The paper calls for a "standardized benchmark suite" to address the reproducibility gap in current cryptographic research.

Limitations:

- RSA is noted to have a computational and memory overhead that grows too rapidly with key size for most modern real-time tasks.
- Quantum algorithms pose a long-term threat to both RSA and ECC, motivating the need for future post-quantum schemes.

**"ANALYSIS OF WATERMARKING TECHNIQUES FOR MEDICAL IMAGES PRESERVING ROI"** Authors: Sonika C. Rathi and Vandana S. Inamdar Year: 2012

Objective:

- The paper focuses on watermarking algorithms that specifically preserve the Region of Interest (ROI) by embedding data in the Region of Non-Interest (RONI).
- The authors aim to provide a survey of existing medical image watermarking approaches for enhancing security and authentication.

Motivation:

- Exchange of "medical reference data" over unsecured networks leads to risks of illegitimate changes that cause undesirable patient outcomes.
- Any distortion in the ROI is unacceptable as it may lead to an incorrect medical diagnosis.

Methodology:

- The survey examines foundation concepts of digital watermarking, including encoding and decoding processes.
- It compares different techniques like LSB-based hashing, wavelet-based schemes, and spiral-scan position methods.
- Performance is measured using PSNR to assess the similarity between images before and after watermarking.

Contribution:

- The research highlights that embedding fragile watermarks into the ROI can facilitate tamper localization, while robust watermarks in the RONI protect the EPR.
- It proposes that segmenting ROI with specific coordinate values (xmin, xmax, ymin, ymax) can free up more space for embedding in the remaining image.
- The study discusses how physicians can affirm tampering if the extraction process fails.

Limitations:

- Existing segmentation algorithms vary significantly between image types (MRI vs. CT vs. US), requiring different implementations for each.
- Most techniques fail to differentiate between intentional malicious tampering and unintentional changes like JPEG compression.

**"Reversible Data Hiding for DICOM Image Using Lifting and Companding"** Authors: Amit Phadikar, Poulami Jana, and Himadri Mandal Year: 2019

Objective:

- The study proposes a reversible watermarking technique for DICOM images that offers high embedding capacity, security, and fidelity.
- The goal is to increase data hiding capacity through "companding" in the lifting-based Discrete Wavelet Transform (DWT) domain.

Motivation:

- Multimedia data is prone to illegal tampering and copyright violation in the digital domain.
- Many current solutions compromise between image quality and the number of watermark bits, making them vulnerable to brute-force attacks.

Methodology:

- The researchers use a simple linear function in companding to make the scheme easy to implement.
- They utilize a content-dependent watermark to make the scheme robust against "collusion" operations.
- Evaluations are performed on a 2.80 GHz processor using MATLAB 7 with MSSIM and PSNR as distortion measures.

Contribution:

- A major contribution is that this scheme does not embed a "location map" in the host image, which helps achieve high fidelity.
- Simulation results show that the host image is restored completely and losslessly by the proposed scheme.
- The relative entropy distance (KLD) is used to quantify the security of the hidden data.

Limitations:

- As payload size increases to 65,536 bits, there is a measurable decrease in PSNR (quality), although structural values remain stable.
- The scheme requires a shared secret seed for the random generator, introducing standard symmetric key distribution challenges.

**"An Extensive Survey of Digital Image Steganography: State of the Art"** Authors: Idakwo M. A., Muazu M. B., Adedokun A. E., and Sadiq B. O. Year: 2020

Objective:

- The paper analyzes current steganographic techniques, recent trends, and challenges in the field of information hiding.
- It aims to evaluate achievements in the spatial, transform, and adaptive domains.

Motivation:

- While cryptography obscures the sense of a message, it draws attention to the fact that secret communication is occurring.
- The adoption rate of steganography is currently low in real-time applications where privacy is paramount due to a trade-off between payload and imperceptibility.

Methodology:

- The researchers conduct a systematic literature review covering requirements, operations, and evaluation metrics like histograms and statistical anomaly detection.
- They categorize techniques based on their embedding process: spatial, frequency, and adaptive.
- Statistical analysis techniques are identified as the primary method for detecting steganography (steganalysis).

Contribution:

- The survey identifies that hybridizing time and frequency domain advantages offers the best trade-off for high-payload, attack-immune systems.
- It provides a comprehensive overview of how image processing attacks (rotation, scaling, noise) can destroy embedded information.
- The study clarifies that 24-bit images have the highest capacity for concealing information compared to 8-bit formats.

Limitations:

- Most current steganalysis methods are only effective if the steganography method is known in advance.
- The "strict constraint of imperceptibility" continues to limit the volume of information that can be hidden in real-time healthcare applications.
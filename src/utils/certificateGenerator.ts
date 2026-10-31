/**
 * Certificate Generator & Exporter
 * Generates high-resolution (2400x1600) official credentials directly in the browser
 * and triggers immediate file downloads without relying on browser print dialogs.
 */

export interface CertificateData {
  studentName: string;
  programName: string;
  certificateId: string;
  issueDate?: string;
  capstoneTitle?: string;
}

export const downloadCertificateImage = async (data: CertificateData): Promise<void> => {
  const {
    studentName,
    programName,
    certificateId,
    issueDate = 'November 30, 2026',
    capstoneTitle,
  } = data;

  const width = 2400;
  const height = 1600;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  // 1. Background Fill - Elegant Crisp Parchment
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Subtle gradient background glow
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 200, width / 2, height / 2, 1200);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.7, '#F8FAFC');
  bgGrad.addColorStop(1, '#EDF2F7');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Dual Security Borders & Frame
  // Outer Navy Border
  ctx.lineWidth = 20;
  ctx.strokeStyle = '#071426';
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Inner Gold Accent Line
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#D97706';
  ctx.strokeRect(68, 68, width - 136, height - 136);

  // Thin Cyan Detail Line
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#0284C7';
  ctx.strokeRect(78, 78, width - 156, height - 156);

  // Corner Ornaments
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = '#D97706';
    ctx.fillRect(0, 0, 50, 4);
    ctx.fillRect(0, 0, 4, 50);
    ctx.beginPath();
    ctx.arc(15, 15, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  drawCorner(90, 90, 0);
  drawCorner(width - 90, 90, Math.PI / 2);
  drawCorner(width - 90, height - 90, Math.PI);
  drawCorner(90, height - 90, -Math.PI / 2);

  // 3. Official Brand Header & Logo
  // Load Logo Image or Draw Monogram
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.src = '/assets/rtoc_r_logo.png';
    await new Promise((resolve) => {
      logoImg.onload = resolve;
      logoImg.onerror = resolve; // Continue if error
    });

    if (logoImg.naturalWidth > 0) {
      // Draw Circular Branded Badge
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2 - 200, 190, 65, 0, Math.PI * 2);
      ctx.fillStyle = '#071426';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#0284C7';
      ctx.stroke();
      ctx.clip();
      ctx.drawImage(logoImg, width / 2 - 265, 125, 130, 130);
      ctx.restore();

      // Brand Title next to logo
      ctx.textAlign = 'left';
      ctx.font = 'bold 58px "Outfit", "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#071426';
      ctx.fillText('RtoC ', width / 2 - 110, 185);
      const rtocWidth = ctx.measureText('RtoC ').width;
      ctx.fillStyle = '#2563EB';
      ctx.fillText('LABS', width / 2 - 110 + rtocWidth, 185);

      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748B';
      ctx.fillText('REASON TO CREATE · NAIROBI, KENYA', width / 2 - 110, 222);
    } else {
      throw new Error('Fallback to text monogram');
    }
  } catch {
    // Monogram Fallback
    ctx.textAlign = 'center';
    ctx.font = 'bold 64px "Outfit", "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#071426';
    ctx.fillText('RtoC LABS', width / 2, 190);
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('REASON TO CREATE · NAIROBI, KENYA', width / 2, 230);
  }

  // 4. Academic Institution Subtitle
  ctx.textAlign = 'center';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#2563EB';
  ctx.letterSpacing = '6px';
  ctx.fillText('ACADEMY OF PRACTICAL DIGITAL SKILLS & AI', width / 2, 310);
  ctx.letterSpacing = '0px';

  // Decorative Horizontal Line
  const gradLine = ctx.createLinearGradient(width / 2 - 350, 335, width / 2 + 350, 335);
  gradLine.addColorStop(0, 'rgba(37, 99, 235, 0)');
  gradLine.addColorStop(0.5, 'rgba(37, 99, 235, 0.8)');
  gradLine.addColorStop(1, 'rgba(37, 99, 235, 0)');
  ctx.strokeStyle = gradLine;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 350, 335);
  ctx.lineTo(width / 2 + 350, 335);
  ctx.stroke();

  // 5. Main Certificate Title
  ctx.font = '800 68px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#071426';
  ctx.fillText('CERTIFICATE OF PRACTICAL COMPETENCE', width / 2, 420);

  // 6. Recipient Citation
  ctx.font = 'italic 30px "Georgia", serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('This credential is officially conferred upon', width / 2, 510);

  // 7. Student Name - Large, bold, commanding
  ctx.font = '800 84px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(studentName || 'Learner Name', width / 2, 630);

  // Name underline
  const nameWidth = Math.min(ctx.measureText(studentName || 'Learner Name').width + 100, 1400);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - nameWidth / 2, 665);
  ctx.lineTo(width / 2 + nameWidth / 2, 665);
  ctx.stroke();

  // 8. Purpose Statement
  ctx.font = '28px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText(
    'for successfully fulfilling all practical syllabus requirements and demonstrating',
    width / 2,
    740
  );
  ctx.fillText(
    'verified technical competence in the learning pathway:',
    width / 2,
    785
  );

  // 9. Program / Track Title
  ctx.font = 'bold 50px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#1D4ED8';
  ctx.fillText(programName || 'Digital Skills & AI Innovation Program', width / 2, 870);

  // 10. Capstone Project (if applicable)
  if (capstoneTitle) {
    ctx.font = 'italic 28px "Georgia", serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(`Practical Capstone: "${capstoneTitle}"`, width / 2, 940);
  }

  // 11. Security Holographic Seal (Center Bottom)
  const sealX = width / 2;
  const sealY = 1180;
  const sealRadius = 95;

  // Gold radial gradient
  const sealGrad = ctx.createRadialGradient(sealX, sealY, 10, sealX, sealY, sealRadius);
  sealGrad.addColorStop(0, '#FEF3C7');
  sealGrad.addColorStop(0.6, '#F59E0B');
  sealGrad.addColorStop(1, '#B45309');

  ctx.save();
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
  ctx.fillStyle = sealGrad;
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.restore();

  // Seal inner rings
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius - 10, 0, Math.PI * 2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#78350F';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius - 18, 0, Math.PI * 2);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();

  // Seal Text
  ctx.fillStyle = '#78350F';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('★ VERIFIED SKILLS ★', sealX, sealY - 18);
  ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('RtoC LABS', sealX, sealY + 12);
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('OFFICIAL CREDENTIAL', sealX, sealY + 36);

  // Credential ID beneath seal
  ctx.font = 'bold 24px "Courier New", monospace';
  ctx.fillStyle = '#475569';
  ctx.fillText(certificateId, sealX, sealY + 140);

  // 12. Signatures
  // Left: Director
  const sigLeftX = width / 2 - 580;
  const sigY = 1200;

  ctx.font = 'italic bold 36px "Brush Script MT", "Caveat", "Georgia", cursive';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('Kevin Ochieng', sigLeftX, sigY);

  ctx.strokeStyle = '#64748B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sigLeftX - 180, sigY + 20);
  ctx.lineTo(sigLeftX + 180, sigY + 20);
  ctx.stroke();

  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('Eng. Kevin Ochieng', sigLeftX, sigY + 55);

  ctx.font = '18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('Director of Academy Programs', sigLeftX, sigY + 85);
  ctx.fillText('RtoC LABS (Reason to Create)', sigLeftX, sigY + 110);

  // Right: Technical Mentor & Issue Date
  const sigRightX = width / 2 + 580;

  ctx.font = 'italic bold 36px "Brush Script MT", "Caveat", "Georgia", cursive';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('Sandra Mwangi', sigRightX, sigY);

  ctx.strokeStyle = '#64748B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sigRightX - 180, sigY + 20);
  ctx.lineTo(sigRightX + 180, sigY + 20);
  ctx.stroke();

  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('Dr. Sandra Mwangi', sigRightX, sigY + 55);

  ctx.font = '18px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('Lead Technical Mentor', sigRightX, sigY + 85);
  ctx.fillText(`Conferred: ${issueDate}`, sigRightX, sigY + 110);

  // 13. Bottom Verification & Cryptographic Bar
  ctx.fillStyle = '#F1F5F9';
  ctx.fillRect(82, height - 120, width - 164, 40);

  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.textAlign = 'left';
  ctx.fillText('🔒 Cryptographically Issued · Google Meet Cohort Verified', 120, height - 95);

  ctx.textAlign = 'right';
  ctx.fillText(`Credential ID: ${certificateId} · https://rtoclabs.com`, width - 120, height - 95);

  // 14. Convert canvas to Blob and initiate direct file download
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to generate certificate blob'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const cleanFileName = `RtoC_Certificate_${certificateId.replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
      link.href = url;
      link.download = cleanFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      resolve();
    }, 'image/png');
  });
};

// --- ข้อมูลผลงาน (แก้ไขตรงนี้!) ---
const portfolioData = {
    'branding': {
        title: 'Logo & Branding Design',
        desc: 'รวมผลงานออกแบบโลโก้และอัตลักษณ์แบรนด์ เน้นความทันสมัยและจดจำง่าย',
        images: [
            'images/graphic/logo1.jpg',  // ใส่ path รูปของนาย
            'images/graphic/logo2.jpg',
            'images/graphic/logo3.jpg',
            'images/graphic/logo4.jpg'
        ]
    },
    'ads': {
        title: 'Advertising & Social Media',
        desc: 'งานออกแบบสื่อโฆษณา แบนเนอร์ และภาพสำหรับโซเชียลมีเดีย',
        images: [
            'images/graphic/ads1.jpg',
            'images/graphic/ads2.jpg'
        ]
    },
    'esport': {
        title: 'Esport Design',
        desc: 'งานออกแบบเสื้อทีม Overlay และสื่อประชาสัมพันธ์วงการเกม',
        images: [
            'images/graphic/esport1.jpg',
            'images/graphic/esport2.jpg'
        ]
    },
    'fivem': {
        title: 'FiveM UI & Server Design',
        desc: 'ออกแบบ Interface ภายในเกม FiveM ทั้ง Inventory, HUD และ Phone System',
        images: [
            'images/ui/ui1.jpg',
            'images/ui/ui2.jpg',
            'images/ui/ui3.jpg'
        ]
    },
    'tiktok': {
        title: 'TikTok Content Creation',
        desc: 'ตัวอย่างผลงานวิดีโอคอนเทนต์สั้น',
        // ถ้าเป็นวิดีโอ ใช้วิธีใส่รูปปกคลิป แล้วลิงก์ไปดู หรือจะ Embed ก็ได้ (ในที่นี้ใช้รูปปกไปก่อน)
        images: [
            'images/video/tiktok-cover1.jpg',
            'images/video/tiktok-cover2.jpg'
        ]
    },
    'video': {
        title: 'Video Editing Portfolio',
        desc: 'ผลงานการตัดต่อ MV และ Vlog',
        images: [
            'images/video/edit1.jpg',
            'images/video/edit2.jpg'
        ]
    },
    // --- ส่วน Experience แบบจัดเต็ม (HTML ได้เลย) ---
    'exp': {
        title: 'Professional Experience (Full Detail)',
        desc: 'ประวัติการทำงานโดยละเอียด',
        customHtml: `
            <div class="timeline-full">
                <div class="timeline-item">
                    <span class="date" style="color: #4ade80;">Current (5 Months)</span>
                    <h3>Graphic Designer @ Plastic Surgery Hospital</h3>
                    <p><strong>Key Responsibilities:</strong></p>
                    <ul style="margin-left: 20px; opacity: 0.8; line-height: 1.6;">
                        <li>ออกแบบสื่อโฆษณาโปรโมชั่นรายเดือน (Online & Offline)</li>
                        <li>ดูแลภาพลักษณ์ CI ของโรงพยาบาลในทุก Platform</li>
                        <li>Retouch ภาพรีวิวศัลยกรรมให้ดูสวยงามและสมจริง</li>
                        <li>ประสานงานกับทีม Marketing เพื่อวาง Strategy ผ่านงานดีไซน์</li>
                    </ul>
                </div>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
                <div class="timeline-item">
                    <span class="date">2023 - 2024 (10 Months)</span>
                    <h3>Graphic Designer @ Skincare Brand</h3>
                    <p>รับผิดชอบการออกแบบ Packaging และสื่อการขายทั้งหมด...</p>
                </div>
                <div class="timeline-item">
                    <span class="date">Freelance Era</span>
                    <h3>Independent Creator</h3>
                    <p>รับงานหลากหลายรูปแบบ ตั้งแต่ Logo, Banner ไปจนถึงดูแลเพจ...</p>
                </div>
            </div>
        `
    }
};

// --- ระบบ Filter และ Modal ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Filter System
    const buttons = document.querySelectorAll('.nav-btn');
    const items = document.querySelectorAll('.grid-item');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');

            items.forEach(item => {
                if (filter === 'all') {
                    // ยกเว้น experience ไม่โชว์ใน all (หรือจะโชว์ก็ได้แล้วแต่ชอบ)
                    if (item.classList.contains('experience')) item.classList.remove('hidden'); 
                    else item.classList.remove('hidden');
                } else {
                    if (item.classList.contains(filter)) item.classList.remove('hidden');
                    else item.classList.add('hidden');
                }
            });
        });
    });

    // 2. Modal System
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-btn');

    // ฟังก์ชันเปิด Modal (ถูกเรียกจาก HTML onclick)
    window.openModal = (key) => {
        const data = portfolioData[key];
        if (!data) return;

        let contentHtml = `<h2>${data.title}</h2><p style="color:#aaa; margin-bottom:20px;">${data.desc}</p>`;

        // เช็คว่าเป็น Experience หรือ Gallery รูปภาพ
        if (data.customHtml) {
            contentHtml += data.customHtml;
        } else if (data.images) {
            contentHtml += `<div class="modal-gallery">`;
            data.images.forEach(imgSrc => {
                contentHtml += `<img src="${imgSrc}" class="modal-img" alt="Work">`;
            });
            contentHtml += `</div>`;
        }

        modalBody.innerHTML = contentHtml;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // ล็อกสกรอลหลังบ้าน
    };

    // ปิด Modal
    closeBtn.onclick = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    // กดพื้นหลังเพื่อปิด
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});

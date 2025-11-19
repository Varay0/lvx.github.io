document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-btn');
    const items = document.querySelectorAll('.grid-item');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            items.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    // ซ่อน experience ถ้าเลือก all (หรือจะให้โชว์ก็ได้แล้วแต่ชอบ)
                    if (item.classList.contains('experience')) {
                        item.classList.add('hidden');
                    }
                } else if (filterValue === 'experience') {
                    if (item.classList.contains('experience')) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
});
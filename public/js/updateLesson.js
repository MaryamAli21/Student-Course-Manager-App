document.addEventListener("DOMContentLoaded", () => {
    const courseUpdateForm = document.getElementById("course-update-form");
    
    courseUpdateForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const courseName = document.getElementById("course-name").value;
        const id = document.getElementById("course-id").value;
        const lessons = [];

        document.querySelectorAll('.lessons-input').forEach(input => {
            lessons.push(input.value);
        });

        try {
            const response = await fetch(`/courses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: courseName, lessons: lessons })
            });
            const course = await response.json();
            alert(`Course updated successfully!`);

        } catch (error) {
            console.error("Error adding course:", error);
        }
    });



    document.getElementById('add-lesson-edit-form').addEventListener('click', function () {
        const lessonsContainer = document.getElementById('lessons-container-update-form');
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';

        lessonItem.innerHTML = `
        <input type="text" name="lessons[]" class="lessons-input" placeholder="Lesson name" required>
        <button type="button" class="remove-lesson">Remove</button>
    `;

        lessonsContainer.appendChild(lessonItem);
    });

    document.getElementById('lessons-container-update-form').addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-lesson')) {
            event.target.parentNode.remove();
        }
    });


});

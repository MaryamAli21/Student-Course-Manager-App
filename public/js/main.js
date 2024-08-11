document.addEventListener("DOMContentLoaded", () => {
    const courseForm = document.getElementById("course-form");
   


    courseForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const courseName = document.getElementById("course-name").value;
        const lessons = [];

        document.querySelectorAll('.lessons-input').forEach(input => {
            lessons.push(input.value);
        });

        try {
            const response = await fetch('/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: courseName, lessons: lessons })
            });
            const course = await response.json();
            console.log("Response from server", course)
            alert(`Course added successfully!`);
            courseName.value = "";
            lessons.value = "";


        } catch (error) {
            console.error("Error adding course:", error);
        }
    });

    

   
    document.getElementById('add-lesson').addEventListener('click', function () {
        const lessonsContainer = document.getElementById('lessons-container');
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';

        lessonItem.innerHTML = `
        <input type="text" name="lessons[]" class="lessons-input" placeholder="Lesson name" required>
        <button type="button" class="remove-lesson">Remove</button>
    `;

        lessonsContainer.appendChild(lessonItem);
    });

    document.getElementById('lessons-container').addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-lesson')) {
            event.target.parentNode.remove();
        }
    });


});

document.getElementById('viewCoursesRecords').addEventListener('click', function () {
    window.location.href = '/courses';
});

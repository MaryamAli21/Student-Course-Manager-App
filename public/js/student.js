document.addEventListener("DOMContentLoaded", () => {


    const studentForm = document.getElementById("student-form");
    const studentUpdateForm = document.getElementById("student-update-form");
    studentForm?.addEventListener("submit", async (e) => {
        e.preventDefault();


        const name = document.getElementById("student-name").value;
        const contact = document.getElementById("student-contact").value;
        const email = document.getElementById("student-email").value;
        const course = document.getElementById("student-course").value;


        try {
            const response = await fetch('/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, contact, email, course })
            });
            const student = await response.json();
            if (student.success)
                alert(`Student added successfully!`);


        } catch (error) {
            console.error("Error adding student:", error);
        }



    });

    studentUpdateForm?.addEventListener("submit", async (e) => {
        e.preventDefault();


        const id = document.getElementById("student-id").value;
        const name = document.getElementById("student-name").value;
        const contact = document.getElementById("student-contact").value;
        const email = document.getElementById("student-email").value;
        const course = document.getElementById("student-course").value;


        try {
            const response = await fetch(`/students/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, contact, email, course })
            });
            const student = await response.json();
            if (student.success)
                alert(`Student updated successfully!`);


        } catch (error) {
            console.error("Error adding student:", error);
        }



    });
});
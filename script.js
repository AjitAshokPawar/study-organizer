// script.js

// Save note to Firestore
function saveNote() {
    const noteText = document.getElementById('noteInput').value;
    if (noteText.trim() === '') return;
    
    db.collection("notes").add({
      text: noteText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      document.getElementById('noteInput').value = '';
      displayNotes();
    })
    .catch((error) => {
      console.error("Error adding note: ", error);
    });
  }
  
  // Display notes from Firestore
  function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    db.collection("notes").orderBy("timestamp", "desc").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent = doc.data().text;
          notesList.appendChild(li);
        });
      })
      .catch((error) => {
        console.error("Error getting notes: ", error);
      });
  }
  
  // Save timetable entry to Firestore
  function saveTimetable() {
    const timetableText = document.getElementById('timetableInput').value;
    if (timetableText.trim() === '') return;
    
    db.collection("timetable").add({
      entry: timetableText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      document.getElementById('timetableInput').value = '';
      displayTimetable();
    })
    .catch((error) => {
      console.error("Error adding timetable entry: ", error);
    });
  }
  
  // Display timetable entries from Firestore
  function displayTimetable() {
    const timetableList = document.getElementById('timetableList');
    timetableList.innerHTML = '';
    db.collection("timetable").orderBy("timestamp", "desc").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent = doc.data().entry;
          timetableList.appendChild(li);
        });
      })
      .catch((error) => {
        console.error("Error getting timetable entries: ", error);
      });
  }
  
  // Save reminder to Firestore
  function saveReminder() {
    const reminderText = document.getElementById('reminderInput').value;
    if (reminderText.trim() === '') return;
    
    db.collection("reminders").add({
      text: reminderText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      document.getElementById('reminderInput').value = '';
      displayReminders();
    })
    .catch((error) => {
      console.error("Error adding reminder: ", error);
    });
  }
  
  // Display reminders from Firestore
  function displayReminders() {
    const reminderList = document.getElementById('reminderList');
    reminderList.innerHTML = '';
    db.collection("reminders").orderBy("timestamp", "desc").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent = doc.data().text;
          reminderList.appendChild(li);
        });
      })
      .catch((error) => {
        console.error("Error getting reminders: ", error);
      });
  }
  
  // Preview photo and optionally upload to Firebase Storage (demo preview here)
  function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = "Study Photo Preview";
        img.className = 'img-fluid mt-3';
        document.getElementById('photoPreview').innerHTML = '';
        document.getElementById('photoPreview').appendChild(img);
      }
      reader.readAsDataURL(file);
      // Optional: Upload file to Firebase Storage
      // const storageRef = storage.ref('photos/' + file.name);
      // storageRef.put(file).then(snapshot => {
      //   console.log('Uploaded a photo!');
      // });
    }
  }
  
  // Display PDF file name and optionally upload to Firebase Storage (demo display only)
  function displayPDFName(event) {
    const file = event.target.files[0];
    if (file) {
      document.getElementById('pdfDisplay').textContent = `Selected file: ${file.name}`;
      // Optional: Upload file to Firebase Storage
      // const storageRef = storage.ref('pdfs/' + file.name);
      // storageRef.put(file).then(snapshot => {
      //   console.log('Uploaded a PDF file!');
      // });
    }
  }
  
  // Initialize displays on page load
  window.onload = function() {
    displayNotes();
    displayTimetable();
    displayReminders();
  }
  
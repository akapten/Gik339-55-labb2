
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

async function fetchData() {
  const url = "http://localhost:3000/users";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Något gick fel med förfrågan: " + response.statusText);
    }
    const users = await response.json();
    createUsersList(users);
    console.log("Användararray:", users);
  } catch (error) {
    console.error("Fel vid hämtning av data:", error);
  }
}

function createUsersList(users) {
  const ul = document.createElement("ul");
  ul.className = "user-list";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.firstName} ${user.lastName} - ${user.username}`;
    if (user.color) {
      li.style.backgroundColor = user.color;
      li.style.color = "white";
    }
    ul.appendChild(li);
  });

  const userListContainer = document.getElementById("userList");
  if (userListContainer) {
    userListContainer.appendChild(ul);
  } else {
    console.error("Element with id 'userList' not found.");
  }
}

async function fetchUsers() {
    try {
        const res = await fetch(`http://localhost:3000/users`);
        const users = await res.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = users
        .map(user => `<li>ID: ${user.id}, Name: ${user.name}</li>`)
        .join('');
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value;

    try {
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        });
        
        nameInput.value = ''; // フォームをクリア
        fetchUsers(); // 一覧を更新
    } catch (error) {
        console.error('Error:', error);
    }
});

fetchUsers();
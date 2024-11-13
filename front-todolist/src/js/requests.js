// Configuração global do Axios
const api = axios.create({
    baseURL: 'http://localhost:5000'
});

// Estados das tarefas com cores correspondentes
const STATUS_COLORS = {
    'ativo': 'primary',
    'desativado': 'secondary',
    'feito': 'success',
    '2': 'warning'
};

// Função para formatar o status para exibição
function formatStatus(status) {
    const statusMap = {
        'ativo': 'Ativo',
        'desativado': 'Desativado',
        'feito': 'Concluído',
        '2': 'Em Andamento'
    };
    return statusMap[status] || status;
}

// Função para criar o HTML de uma única tarefa
function createTaskElement(task) {
    const statusColor = STATUS_COLORS[task.status] || 'secondary';
    return `
        <div class="list-group-item bg-dark text-light d-flex justify-content-between align-items-center mb-2">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${task.title}</div>
                <p class="mb-1">${task.text}</p>
                <span class="badge bg-${statusColor}">${formatStatus(task.status)}</span>
            </div>
            <div class="btn-group" role="group">
                <button class="btn btn-outline-warning btn-sm" onclick="editTask('${task.id}')">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteTask('${task.id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Função para carregar e exibir todas as tarefas
async function getAllTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) {
        return; // Sai da função se o elemento não existir
    }

    try {
        const response = await api.get('/todo');
        
        if (response.data.length === 0) {
            taskList.innerHTML = '<p class="text-center m-3">Nenhuma tarefa encontrada</p>';
            return;
        }

        taskList.innerHTML = response.data
            .map(task => createTaskElement(task))
            .join('');
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        taskList.innerHTML = '<p class="text-center text-danger m-3">Erro ao carregar tarefas</p>';
    }
}

// Função para carregar dados de uma tarefa específica
async function loadTaskData(taskId) {
    try {
        const response = await api.get(`/todo/${taskId}`);
        const task = response.data;
        
        const form = document.getElementById('taskForm');
        if (form) {
            form.title.value = task.title || '';
            form.description.value = task.text || '';
            form.status.value = task.status || '';
        }
    } catch (error) {
        console.error('Erro ao carregar dados da tarefa:', error);
        showError('Não foi possível carregar os dados da tarefa');
    }
}

// Função para criar uma nova tarefa
async function createTask(taskData) {
    try {
        await api.post('/todo', {
            title: taskData.title,
            text: taskData.text,
            status: taskData.status
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        showError('Erro ao criar tarefa');
    }
}

// Função para atualizar uma tarefa
async function updateTask(taskId, updatedData) {
    try {
        await api.put(`/todo/${taskId}`, {
            title: updatedData.title,
            text: updatedData.text,
            status: updatedData.status
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        showError('Erro ao atualizar tarefa');
    }
}

// Função para deletar uma tarefa
async function deleteTask(taskId) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

    try {
        await api.delete(`/todo/${taskId}`);
        getAllTasks();
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        showError('Erro ao excluir tarefa');
    }
}

// Função para editar uma tarefa
function editTask(taskId) {
    window.location.href = `create-task.html?id=${taskId}`;
}

// Função auxiliar para mostrar erros
function showError(message) {
    alert(message);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isIndex = path.endsWith('index.html') || path.endsWith('/');
    const isCreateTask = path.endsWith('create-task.html');
    
    // Carrega tarefas apenas na página index
    if (isIndex) {
        getAllTasks();
    }
    
    // Configuração da página de criação/edição
    if (isCreateTask) {
        const urlParams = new URLSearchParams(window.location.search);
        const taskId = urlParams.get('id');
        
        if (taskId) {
            loadTaskData(taskId);
        }
        
        const form = document.getElementById('taskForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = {
                    title: form.title.value.trim(),
                    text: form.description.value.trim(),
                    status: form.status.value
                };

                if (taskId) {
                    await updateTask(taskId, formData);
                } else {
                    await createTask(formData);
                }
            });
        }
    }
});
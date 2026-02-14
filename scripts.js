// ==================== CONFIGURATION ====================
const CONFIG = {
    typingSpeed: 100,
    typingDelay: 2000,
    particleCount: 100,
    toastDuration: 3000
};

// ==================== SAMPLE SCRIPTS DATA ====================
const scriptsData = [
    {
        id: 1,
        name: "Universal ESP",
        description: "Visualiza a todos los jugadores a través de paredes con información detallada en tiempo real",
        category: "exploit",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        code: `-- Universal ESP by LJZG
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local Camera = workspace.CurrentCamera
local LocalPlayer = Players.LocalPlayer

local espObjects = {}

function createESP(player)
    if player == LocalPlayer then return end
    
    local esp = {
        Box = Drawing.new("Square"),
        Name = Drawing.new("Text"),
        Distance = Drawing.new("Text"),
        Health = Drawing.new("Line")
    }
    
    esp.Box.Thickness = 2
    esp.Box.Color = Color3.fromRGB(0, 212, 255)
    esp.Box.Transparency = 1
    esp.Box.Filled = false
    
    espObjects[player] = esp
end

function updateESP()
    for player, esp in pairs(espObjects) do
        if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
            local hrp = player.Character.HumanoidRootPart
            local humanoid = player.Character:FindFirstChild("Humanoid")
            
            local vector, onScreen = Camera:WorldToViewportPoint(hrp.Position)
            
            if onScreen then
                local distance = (Camera.CFrame.Position - hrp.Position).Magnitude
                local sizeFactor = 1000 / distance
                
                esp.Box.Size = Vector2.new(sizeFactor * 2, sizeFactor * 3)
                esp.Box.Position = Vector2.new(vector.X - esp.Box.Size.X / 2, vector.Y - esp.Box.Size.Y / 2)
                esp.Box.Visible = true
            else
                esp.Box.Visible = false
                esp.Name.Visible = false
                esp.Distance.Visible = false
                esp.Health.Visible = false
            end
        end
    end
end

for _, player in ipairs(Players:GetPlayers()) do
    createESP(player)
end

Players.PlayerAdded:Connect(createESP)

RunService.RenderStepped:Connect(updateESP)

print("ESP Loaded Successfully!")`
    },
    {
        id: 2,
        name: "Aimbot Avanzado",
        description: "Sistema de puntería automática con predicción avanzada y smoothing configurable",
        category: "exploit",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
        code: `-- Aimbot Avanzado by LJZG
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local Camera = workspace.CurrentCamera
local LocalPlayer = Players.LocalPlayer

local Settings = {
    Enabled = true,
    TeamCheck = true,
    FOV = 100,
    Smoothing = 0.5,
    AimPart = "Head",
    Prediction = true,
    PredictionAmount = 0.125
}

local FOVCircle = Drawing.new("Circle")
FOVCircle.Thickness = 2
FOVCircle.NumSides = 64
FOVCircle.Radius = Settings.FOV
FOVCircle.Filled = false
FOVCircle.Color = Color3.fromRGB(0, 212, 255)
FOVCircle.Transparency = 1
FOVCircle.Visible = true

function getClosestPlayer()
    local closestPlayer = nil
    local shortestDistance = Settings.FOV
    
    for _, player in ipairs(Players:GetPlayers()) do
        if player ~= LocalPlayer and player.Character then
            if Settings.TeamCheck and player.Team == LocalPlayer.Team then
                continue
            end
            
            local character = player.Character
            local aimPart = character:FindFirstChild(Settings.AimPart)
            
            if aimPart then
                local screenPoint = Camera:WorldToViewportPoint(aimPart.Position)
                local mousePosition = UserInputService:GetMouseLocation()
                local distance = (Vector2.new(screenPoint.X, screenPoint.Y) - mousePosition).Magnitude
                
                if distance < shortestDistance then
                    closestPlayer = player
                    shortestDistance = distance
                end
            end
        end
    end
    
    return closestPlayer
end

function aimAt(player)
    if not player or not player.Character then return end
    
    local aimPart = player.Character:FindFirstChild(Settings.AimPart)
    if not aimPart then return end
    
    local targetPosition = aimPart.Position
    
    if Settings.Prediction then
        local velocity = aimPart.AssemblyVelocity
        targetPosition = targetPosition + (velocity * Settings.PredictionAmount)
    end
    
    local currentCamera = Camera.CFrame
    local targetCamera = CFrame.new(currentCamera.Position, targetPosition)
    
    Camera.CFrame = currentCamera:Lerp(targetCamera, Settings.Smoothing)
end

RunService.RenderStepped:Connect(function()
    FOVCircle.Position = UserInputService:GetMouseLocation()
    
    if Settings.Enabled and UserInputService:IsMouseButtonPressed(Enum.UserInputType.MouseButton2) then
        local target = getClosestPlayer()
        if target then
            aimAt(target)
        end
    end
end)

print("Aimbot Activated!")`
    },
    {
        id: 3,
        name: "Admin Commands GUI",
        description: "Panel de administración completo con más de 50 comandos personalizables",
        category: "admin",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
        code: `-- Admin Commands GUI by LJZG
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

local ScreenGui = Instance.new("ScreenGui")
local MainFrame = Instance.new("Frame")
local Title = Instance.new("TextLabel")
local CommandBox = Instance.new("TextBox")
local ExecuteButton = Instance.new("TextButton")

ScreenGui.Parent = LocalPlayer:WaitForChild("PlayerGui")
ScreenGui.ResetOnSpawn = false

MainFrame.Parent = ScreenGui
MainFrame.BackgroundColor3 = Color3.fromRGB(10, 14, 26)
MainFrame.BorderColor3 = Color3.fromRGB(0, 212, 255)
MainFrame.Position = UDim2.new(0.5, -200, 0.5, -150)
MainFrame.Size = UDim2.new(0, 400, 0, 300)
MainFrame.Active = true
MainFrame.Draggable = true

Title.Parent = MainFrame
Title.BackgroundTransparency = 1
Title.Size = UDim2.new(1, 0, 0, 40)
Title.Font = Enum.Font.GothamBold
Title.Text = "LJZG Admin Commands"
Title.TextColor3 = Color3.fromRGB(0, 212, 255)
Title.TextSize = 18

CommandBox.Parent = MainFrame
CommandBox.Position = UDim2.new(0.05, 0, 0.2, 0)
CommandBox.Size = UDim2.new(0.9, 0, 0, 40)
CommandBox.BackgroundColor3 = Color3.fromRGB(15, 20, 32)
CommandBox.BorderColor3 = Color3.fromRGB(0, 212, 255)
CommandBox.Font = Enum.Font.Code
CommandBox.PlaceholderText = "Enter command..."
CommandBox.Text = ""
CommandBox.TextColor3 = Color3.fromRGB(255, 255, 255)
CommandBox.TextSize = 14

ExecuteButton.Parent = MainFrame
ExecuteButton.Position = UDim2.new(0.05, 0, 0.4, 0)
ExecuteButton.Size = UDim2.new(0.9, 0, 0, 40)
ExecuteButton.BackgroundColor3 = Color3.fromRGB(0, 212, 255)
ExecuteButton.Font = Enum.Font.GothamBold
ExecuteButton.Text = "Execute"
ExecuteButton.TextColor3 = Color3.fromRGB(10, 14, 26)
ExecuteButton.TextSize = 16

local Commands = {
    ["speed"] = function(args)
        if LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("Humanoid") then
            LocalPlayer.Character.Humanoid.WalkSpeed = tonumber(args[1]) or 16
        end
    end,
    ["jump"] = function(args)
        if LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("Humanoid") then
            LocalPlayer.Character.Humanoid.JumpPower = tonumber(args[1]) or 50
        end
    end,
    ["god"] = function()
        if LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("Humanoid") then
            LocalPlayer.Character.Humanoid.MaxHealth = math.huge
            LocalPlayer.Character.Humanoid.Health = math.huge
        end
    end
}

ExecuteButton.MouseButton1Click:Connect(function()
    local input = CommandBox.Text:lower()
    local args = input:split(" ")
    local command = args[1]
    table.remove(args, 1)
    
    if Commands[command] then
        Commands[command](args)
        CommandBox.Text = ""
    end
end)

print("Admin GUI Loaded!")`
    },
    {
        id: 4,
        name: "Infinite Jump",
        description: "Salta infinitamente sin límites, perfecto para exploración",
        category: "misc",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
        code: `-- Infinite Jump by LJZG
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local LocalPlayer = Players.LocalPlayer

local InfiniteJumpEnabled = true

UserInputService.JumpRequest:Connect(function()
    if InfiniteJumpEnabled then
        local character = LocalPlayer.Character
        if character then
            local humanoid = character:FindFirstChildOfClass("Humanoid")
            if humanoid then
                humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
            end
        end
    end
end)

print("Infinite Jump Activated!")`
    },
    {
        id: 5,
        name: "Fly Script V3",
        description: "Sistema de vuelo avanzado con control de velocidad y física mejorada",
        category: "misc",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`,
        code: `-- Fly Script V3 by LJZG
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local LocalPlayer = Players.LocalPlayer

local flying = false
local speed = 50
local bodyVelocity
local bodyGyro

function startFlying()
    local character = LocalPlayer.Character
    if not character or flying then return end
    
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    flying = true
    
    bodyVelocity = Instance.new("BodyVelocity")
    bodyVelocity.Velocity = Vector3.new(0, 0, 0)
    bodyVelocity.MaxForce = Vector3.new(9e9, 9e9, 9e9)
    bodyVelocity.Parent = humanoidRootPart
    
    bodyGyro = Instance.new("BodyGyro")
    bodyGyro.MaxTorque = Vector3.new(9e9, 9e9, 9e9)
    bodyGyro.P = 9e4
    bodyGyro.Parent = humanoidRootPart
    
    RunService.RenderStepped:Connect(function()
        if flying then
            local camera = workspace.CurrentCamera
            local moveDirection = Vector3.new(0, 0, 0)
            
            if UserInputService:IsKeyDown(Enum.KeyCode.W) then
                moveDirection = moveDirection + camera.CFrame.LookVector
            end
            if UserInputService:IsKeyDown(Enum.KeyCode.S) then
                moveDirection = moveDirection - camera.CFrame.LookVector
            end
            if UserInputService:IsKeyDown(Enum.KeyCode.A) then
                moveDirection = moveDirection - camera.CFrame.RightVector
            end
            if UserInputService:IsKeyDown(Enum.KeyCode.D) then
                moveDirection = moveDirection + camera.CFrame.RightVector
            end
            if UserInputService:IsKeyDown(Enum.KeyCode.Space) then
                moveDirection = moveDirection + Vector3.new(0, 1, 0)
            end
            if UserInputService:IsKeyDown(Enum.KeyCode.LeftShift) then
                moveDirection = moveDirection - Vector3.new(0, 1, 0)
            end
            
            if moveDirection.Magnitude > 0 then
                moveDirection = moveDirection.Unit
            end
            
            bodyVelocity.Velocity = moveDirection * speed
            bodyGyro.CFrame = camera.CFrame
        end
    end)
end

function stopFlying()
    flying = false
    if bodyVelocity then bodyVelocity:Destroy() end
    if bodyGyro then bodyGyro:Destroy() end
end

UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.E then
        if flying then
            stopFlying()
        else
            startFlying()
        end
    end
end)

print("Fly Script Loaded! Press E to toggle")`
    },
    {
        id: 6,
        name: "Speed Hack",
        description: "Aumenta tu velocidad de movimiento con controles personalizables",
        category: "misc",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
        code: `-- Speed Hack by LJZG
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

local defaultSpeed = 16
local speedMultiplier = 3

if LocalPlayer.Character then
    local humanoid = LocalPlayer.Character:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.WalkSpeed = defaultSpeed * speedMultiplier
    end
end

LocalPlayer.CharacterAdded:Connect(function(character)
    local humanoid = character:WaitForChild("Humanoid")
    humanoid.WalkSpeed = defaultSpeed * speedMultiplier
end)

print("Speed Hack Loaded!")`
    }
];

// ==================== TYPING ANIMATION ====================
const typingTexts = ['Scripts de Roblox', 'LJZG EXP'];
let currentTextIndex = 0;

function typeText(element, speed = CONFIG.typingSpeed) {
    const text = typingTexts[currentTextIndex];
    let index = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                eraseText(element, speed);
            }, 3500);
        }
    }, speed);
}

function eraseText(element, speed) {
    let text = element.textContent;
    
    const interval = setInterval(() => {
        if (text.length > 0) {
            text = text.slice(0, -1);
            element.textContent = text;
        } else {
            clearInterval(interval);
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(() => {
                typeText(element, speed);
            }, 800);
        }
    }, speed / 2);
}

// ==================== PARTICLES CANVAS ====================
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (1 - distance / 100) * 0.2;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot) return;
    
    if (cursorOutline) {
        cursorOutline.style.display = 'none';
    }
    
    if (window.innerWidth <= 768 || ('ontouchstart' in window)) {
        cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let timeout;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorDot.style.opacity = '1';
        
        isMouseMoving = true;
        
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cursorDot.style.opacity = '0';
        }, 2000);
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
    });
    
    document.querySelectorAll('a, button, .btn, .nav-link, .script-card, .contact-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorDot.style.background = 'var(--color-accent)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorDot.style.background = 'var(--color-primary)';
        });
    });
}

// ==================== SCROLL PROGRESS ====================
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==================== HEADER SCROLL ====================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const burger = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            burger.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== LOAD SCRIPTS ====================
function loadScripts() {
    const grid = document.getElementById('scriptsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    scriptsData.forEach((script, index) => {
        const card = document.createElement('div');
        card.className = 'script-card';
        card.setAttribute('data-category', script.category);
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="script-header">
                <div class="script-icon">${script.icon}</div>
                <span class="script-badge">${script.category}</span>
            </div>
            <h3 class="script-title">${script.name}</h3>
            <p class="script-description">${script.description}</p>
            <div class="script-buttons">
                <button class="script-btn btn-view" data-id="${script.id}">Ver Código</button>
                <button class="script-btn btn-copy" data-id="${script.id}">Copiar</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    attachScriptListeners();
}

// ==================== SCRIPT LISTENERS ====================
function attachScriptListeners() {
    const viewButtons = document.querySelectorAll('.btn-view');
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const scriptId = parseInt(this.getAttribute('data-id'));
            const script = scriptsData.find(s => s.id === scriptId);
            if (script) {
                openModal(script);
            }
        });
    });
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const scriptId = parseInt(this.getAttribute('data-id'));
            const script = scriptsData.find(s => s.id === scriptId);
            if (script) {
                copyToClipboard(script.code, this);
            }
        });
    });
}

// ==================== MODAL ====================
function openModal(script) {
    const modal = document.getElementById('scriptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCode = document.getElementById('modalCode');
    
    modalTitle.textContent = script.name;
    modalCode.textContent = script.code;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('scriptModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function initModal() {
    const modal = document.getElementById('scriptModal');
    const backdrop = document.querySelector('.modal-backdrop');
    const closeBtn = document.getElementById('modalClose');
    const copyBtn = document.getElementById('copyCodeBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!modal) return;
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = document.getElementById('modalCode').textContent;
            copyToClipboard(code, copyBtn);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const code = document.getElementById('modalCode').textContent;
            const title = document.getElementById('modalTitle').textContent;
            downloadScript(code, title);
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==================== CLIPBOARD ====================
function copyToClipboard(text, buttonElement) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            if (buttonElement) {
                const originalText = buttonElement.textContent;
                buttonElement.textContent = '✓ Copiado';
                buttonElement.classList.add('copied');
                
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                    buttonElement.classList.remove('copied');
                }, 2000);
            }
            showToast('¡Código copiado al portapapeles!');
        }).catch(err => {
            console.error('Error al copiar:', err);
            fallbackCopy(text, buttonElement);
        });
    } else {
        fallbackCopy(text, buttonElement);
    }
}

function fallbackCopy(text, buttonElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            if (buttonElement) {
                const originalText = buttonElement.textContent;
                buttonElement.textContent = '✓ Copiado';
                buttonElement.classList.add('copied');
                
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                    buttonElement.classList.remove('copied');
                }, 2000);
            }
            showToast('¡Código copiado al portapapeles!');
        } else {
            showToast('Error al copiar el código', 'error');
        }
    } catch (err) {
        console.error('Error en fallback copy:', err);
        showToast('Error al copiar el código', 'error');
    }
    
    document.body.removeChild(textArea);
}

// ==================== DOWNLOAD SCRIPT ====================
function downloadScript(code, title) {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.lua`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Script descargado!');
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
        toastMessage.textContent = message;
    }
    
    const toastIcon = toast.querySelector('.toast-icon');
    
    if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #ff4444, #ff0000)';
        toast.style.color = '#fff';
        if (toastIcon) toastIcon.textContent = '✗';
    } else if (type === 'cat') {
        toast.style.background = 'linear-gradient(135deg, #ffaa00, #ff7700)';
        toast.style.color = '#000';
        if (toastIcon) toastIcon.textContent = '🐱';
        setTimeout(() => {
            if (toastIcon) toastIcon.textContent = '✓';
        }, 2000);
    } else {
        toast.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))';
        toast.style.color = 'var(--color-bg-dark)';
        if (toastIcon) toastIcon.textContent = '✓';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, CONFIG.toastDuration);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.script-card, .skill-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== REMOVE EXTRA BOTTOM LINE ====================
function fixBottomLine() {
    const body = document.body;
    const html = document.documentElement;
    
    body.style.margin = '0';
    body.style.padding = '0';
    html.style.margin = '0';
    html.style.padding = '0';
    
    const lastElement = document.querySelector('.footer');
    if (lastElement) {
        lastElement.style.marginBottom = '0';
    }
}

// ==================== ELIMINAR OUTLINE DE NAVEGACIÓN ====================
function removeNavigationOutline() {
    document.querySelectorAll('.nav-link, .burger-menu, .btn, .script-btn, .contact-card, .modal-close').forEach(el => {
        el.addEventListener('mousedown', (e) => {
            e.preventDefault();
            el.style.outline = 'none';
        });
        
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                el.style.outline = '2px solid var(--color-primary)';
            }
        });
    });
}

// ==================== EASTER EGG - GATO ====================
function initCatEasterEgg() {
    const cat = document.getElementById('catEasterEgg');
    if (!cat) return;
    
    const catMessages = [
        "¡Miau! 🐱 Programando scripts...",
        "9 vidas, 9 bugs por arreglar",
        "¿Robux? No, yo quiero atún 🐟",
        "pspspsps... ven aquí script",
        "El gato de Schrödinger está en el modal",
        "Meow-trix mode activated",
        "Error 418: I'm a teapot... digo, gato",
        "Compilando con patas 🐾",
        "Hackeando el pescado digital",
        "¡Larga vida al bigote!",
        "NPC: Gato callejero",
        "100% real no fake",
        "Este gato no necesita script",
        "LJZG: Las Justas Zarpas del Gato",
        "¡Miau! ¿Viste mi cola? 🐱",
        "Soy el gato de la programación",
        "9 líneas de código, 9 vidas",
        "El gato está en el servidor"
    ];
    
    setInterval(() => {
        const message = cat.querySelector('.cat-message');
        if (message && cat.matches(':hover')) {
            const randomIndex = Math.floor(Math.random() * catMessages.length);
            message.textContent = catMessages[randomIndex];
        }
    }, 3000);
    
    cat.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        cat.style.animation = 'none';
        cat.offsetHeight;
        cat.style.animation = 'catExplode 0.3s ease';
        
        const message = cat.querySelector('.cat-message');
        const originalMessage = message.textContent;
        message.textContent = "¡MEOW! 🐱🔊";
        message.style.background = 'linear-gradient(135deg, #ff00ff, #00ffff)';
        message.style.color = '#000';
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                cat.style.transform = `translateY(${Math.sin(i) * 5}px)`;
            }, i * 50);
        }
        
        setTimeout(() => {
            message.textContent = originalMessage;
            message.style.background = '';
            message.style.color = '';
            cat.style.transform = '';
        }, 1000);
        
        showToast('¡El gato hackeó el portapapeles! 🐱', 'cat');
    });
    
    cat.addEventListener('mousemove', (e) => {
        const eyes = cat.querySelectorAll('.cat-eye');
        const rect = cat.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeX = eyeRect.left - rect.left + eyeRect.width / 2;
            const eyeY = eyeRect.top - rect.top + eyeRect.height / 2;
            
            const deltaX = mouseX - eyeX;
            const deltaY = mouseY - eyeY;
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(3, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10);
            
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    cat.addEventListener('mouseleave', () => {
        const eyes = cat.querySelectorAll('.cat-eye');
        eyes.forEach(eye => {
            eye.style.transform = '';
        });
    });
    
    console.log('🐱 Easter Egg: Gato programador activado');
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        setTimeout(() => {
            typeText(typingElement, 80);
        }, CONFIG.typingDelay);
    }
    
    initParticles();
    initCustomCursor();
    initScrollProgress();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    loadScripts();
    initModal();
    initScrollAnimations();
    fixBottomLine();
    removeNavigationOutline();
    initCatEasterEgg();
    
    console.log('%c LJZG Scripts Loaded! ', 'background: linear-gradient(90deg, #00d4ff, #00ffff); color: #0a0e1a; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c 🐱 También cargamos un gato! ', 'background: #ffaa00; color: #000; font-size: 16px; padding: 5px;');
});

window.addEventListener('resize', fixBottomLine);

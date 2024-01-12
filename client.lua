RegisterCommand('helpCenter', function()
    openUI()
end)

function openUI()
    SendNUIMessage({
        action = 'show',
        status = true,
    })

    SetNuiFocus(true, true)
end

Citizen.CreateThread(function()
    TriggerEvent('chat:addSuggestion', '/helpCenter', 'Help Center UI')
end)

RegisterNUICallback("close", function()
    SetNuiFocus(false, false)
end)

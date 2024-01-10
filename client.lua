RegisterCommand("help", function()
    SendNUIMessage(
        {
            show = true,
        }
    )
    SetNuiFocus(true, true)
end)

RegisterNUICallback("close", function()
    SetNuiFocus(false, false)
end)
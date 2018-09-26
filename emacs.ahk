;#NoEnv
;#UseHook
SendMode Input

Control::CapsLock
CapsLock::Control

; Test for keybinds
; MsgBox You pressed Yes

^a::
Send {Home}
return

^e::
Send {End}
return

^p::
Send {Up}
return

^n::
Send {Down}
return

^w::
Send ^{Del}
return

!f::
Send ^{Right}
return

!b::
Send ^{Left}
return

^!h::
{

    Send, ^a
    return
}

^!s::
{
    Send, ^c
    Sleep, 50
    Run, http://www.bing.com/search?q=%clipboard%
    return
}
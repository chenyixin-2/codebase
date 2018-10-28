#NoEnv
#UseHook ;don't use "SendMode Input" mode, all hotkeys are missing

Control::CapsLock
CapsLock::Control

; MsgBox You pressed Yes

;^x & ^s::
;Send ^s
;return

^k::
Send, {SHIFT}+{End}
Send, ^x
Return

^y::
Send, ^v
Return

^!d::
Send, %A_MM%/%A_DD%/%A_YYYY%
Return

^i::
SendInput, ^f
;Send ^f
return

^b::
SendInput, {Left}
return

^f::
Send {Right}
return

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

!f::
Send ^{Right}
return

!b::
Send ^{Left}
return

!d::
Send ^{Del}
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
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IoIosSend } from "react-icons/io"
import { FaVideo } from "react-icons/fa"

import User from "./User"
import MessageBox from "./MessageBox"
import { getMessageThunk, sendMessageThunk } from "../reduxStore/messageSlice/message.thunk"

const ChatBox = () => {
  const dispatch = useDispatch()

  // ================= CHAT STATE =================
  const selectedUser = useSelector((state) => state.user.selectedUser)
  const messages = useSelector((state) => state.message.messages) || []
  const socket = useSelector((state) => state.socket.socket)

  const [messageData, setMessageData] = useState({
    receiverId: "",
    message: ""
  })

  // ================= VIDEO CALL STATE =================
  const [callOpen, setCallOpen] = useState(false)
  const [incomingCall, setIncomingCall] = useState(null)

  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const peerRef = useRef(null)
  const streamRef = useRef(null)

  // ================= FETCH MESSAGES =================
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser._id }))
      setMessageData((prev) => ({ ...prev, receiverId: selectedUser._id }))
    }
  }, [selectedUser?._id, dispatch])

  // ================= INPUT HANDLERS =================
  function handleChange(e) {
    setMessageData({ ...messageData, message: e.target.value })
  }

  function handleSubmit() {
    if (!messageData.message) return
    dispatch(sendMessageThunk(messageData))
    setMessageData((prev) => ({ ...prev, message: "" }))
  }

  // ================= CREATE PEER CONNECTION =================
  function createPeerConnection() {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    })

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0]
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: selectedUser._id,
          candidate: event.candidate
        })
      }
    }

    return pc
  }

  // ================= START VIDEO CALL (OFFER) =================
  async function startCall() {
    if (!socket || !selectedUser) return

    setCallOpen(true)

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })

    streamRef.current = stream
    localVideoRef.current.srcObject = stream

    const pc = createPeerConnection()
    peerRef.current = pc

    stream.getTracks().forEach((track) => pc.addTrack(track, stream))

    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    socket.emit("call-user", {
      to: selectedUser._id,
      offer
    })
  }

  // ================= SOCKET EVENTS =================
  useEffect(() => {
    if (!socket) return

    socket.on("incoming-call", ({ from, offer }) => {
      setIncomingCall({ from, offer })
      setCallOpen(true)
    })

    socket.on("call-accepted", async ({ answer }) => {
      await peerRef.current.setRemoteDescription(answer)
    })

    socket.on("ice-candidate", async ({ candidate }) => {
      await peerRef.current.addIceCandidate(candidate)
    })

    return () => {
      socket.off("incoming-call")
      socket.off("call-accepted")
      socket.off("ice-candidate")
    }
  }, [socket])

  // ================= ACCEPT CALL (ANSWER) =================
  async function acceptCall() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })

    streamRef.current = stream
    localVideoRef.current.srcObject = stream

    const pc = createPeerConnection()
    peerRef.current = pc

    stream.getTracks().forEach((track) => pc.addTrack(track, stream))

    await pc.setRemoteDescription(incomingCall.offer)

    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    socket.emit("answer-call", {
      to: incomingCall.from,
      answer
    })

    setIncomingCall(null)
  }

  // ================= END CALL =================
  function endCall() {
    setCallOpen(false)

    streamRef.current?.getTracks().forEach((track) => track.stop())
    peerRef.current?.close()

    streamRef.current = null
    peerRef.current = null
  }

  // ================= UI =================
  return (
    <>
      {selectedUser ? (
        <div className="w-full h-screen flex flex-col bg-gray-900 text-white">

          {/* HEADER */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <User user={selectedUser} />
            <FaVideo className="cursor-pointer" size={22} onClick={startCall} />
          </div>

          {/* VIDEO CALL MODAL */}
          {callOpen && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 p-4 rounded-lg">
                {incomingCall && (
                  <button
                    className="bg-green-600 px-4 py-2 rounded mb-2 w-full"
                    onClick={acceptCall}
                  >
                    Accept Call
                  </button>
                )}

                <div className="flex gap-2">
                  <video ref={localVideoRef} autoPlay muted className="w-40 h-40 bg-black rounded" />
                  <video ref={remoteVideoRef} autoPlay className="w-40 h-40 bg-black rounded" />
                </div>

                <button
                  className="bg-red-600 mt-3 w-full py-2 rounded"
                  onClick={endCall}
                >
                  End Call
                </button>
              </div>
            </div>
          )}

          {/* MESSAGES */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <MessageBox key={msg._id} msg={msg} />
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                className="flex-1 bg-gray-800 p-2 rounded"
                value={messageData.message}
                onChange={handleChange}
                placeholder="Type a message..."
              />
              <button onClick={handleSubmit} className="btn btn-success">
                <IoIosSend size={18} />
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex items-center justify-center h-screen text-gray-400">
          Select user to chat
        </div>
      )}
    </>
  )
}

export default ChatBox

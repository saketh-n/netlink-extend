// Conversation data for different personas
const personas = {
  persona1: {
    name: "Sarah Chen",
    title: "Product Manager at TechCorp",
    avatar: "https://i.pravatar.cc/150?img=1",
    conversations: [
      { sender: "user", text: "Hi Sarah, great connecting with you!", timestamp: "2024-03-15 10:00 AM" },
      { sender: "other", text: "Thanks for reaching out! Always good to connect with fellow product enthusiasts.", timestamp: "2024-03-15 10:30 AM" },
      { sender: "user", text: "Would love to hear about your experience at TechCorp!", timestamp: "2024-03-15 11:00 AM" },
      { sender: "other", text: "Happy to share! Been here 3 years, focusing on AI products. What\'s your background?", timestamp: "2024-03-15 11:15 AM" }
    ]
  },
  persona2: {
    name: "Mike Rodriguez",
    title: "VP Sales at StartupX",
    avatar: "https://i.pravatar.cc/150?img=2",
    conversations: [
      { sender: "user", text: "Hi Mike! I wanted to tell you about Grupa - we\'re revolutionizing team collaboration.", timestamp: "2024-03-10 09:00 AM" },
      { sender: "other", text: "Thanks, but we\'re not looking for new collaboration tools at the moment.", timestamp: "2024-03-10 09:30 AM" },
      { sender: "user", text: "No problem! Would you be open to a quick demo in the future?", timestamp: "2024-03-10 09:45 AM" },
      { sender: "other", text: "I\'ll pass for now, but appreciate the offer.", timestamp: "2024-03-10 10:00 AM" }
    ]
  },
  persona3: {
    name: "Emily Watson",
    title: "CTO at InnovateCo",
    avatar: "https://i.pravatar.cc/150?img=3",
    conversations: [
      { sender: "user", text: "Emily, excited to share Grupa with you - it could transform your team\'s workflow!", timestamp: "2024-03-13 02:00 PM" },
      { sender: "other", text: "Interesting! We\'ve been looking for something like this. Tell me more.", timestamp: "2024-03-13 02:30 PM" },
      { sender: "user", text: "Great! Grupa helps teams collaborate 3x faster with AI-powered workflows. When works for a demo?", timestamp: "2024-03-13 02:45 PM" },
      { sender: "other", text: "Sounds promising. Let me check with my team and get back to you next week.", timestamp: "2024-03-13 03:00 PM" }
    ]
  },
  persona4: {
    name: "David Park",
    title: "Engineering Director at ScaleUp",
    avatar: "https://i.pravatar.cc/150?img=4",
    conversations: [
      { sender: "user", text: "David, would love to introduce you to Grupa!", timestamp: "2024-02-01 11:00 AM" },
      { sender: "other", text: "Perfect timing! We need something like this.", timestamp: "2024-02-01 11:30 AM" },
      { sender: "user", text: "Great! Here\'s a link to schedule a demo.", timestamp: "2024-02-01 11:45 AM" },
      { sender: "other", text: "Demo was great! Moving forward with implementation next month.", timestamp: "2024-02-15 03:00 PM" },
      { sender: "user", text: "Excellent! I\'ll have our success team reach out.", timestamp: "2024-02-15 03:15 PM" }
    ]
  },
  persona5: {
    name: "Alex Nova",
    title: "AI Researcher",
    avatar: "https://i.pravatar.cc/150?img=5", // Assuming pravatar provides a new image for img=5
    conversations: [
      { sender: "other", text: "Hello! I'm Alex. I can respond in real-time.", timestamp: "2024-03-18 09:00 AM" }
    ]
  }
};

// Helper to get the last message for list display
function getLastMessageDetails(conversations) {
  if (!conversations || conversations.length === 0) {
    return { text: "No messages yet", time: "" };
  }
  const lastConv = conversations[conversations.length - 1];
  const timeParts = lastConv.timestamp.split(' ');
  // Ensure we have a time part, otherwise, it could be just a date
  const time = timeParts.length > 1 ? timeParts.slice(1).join(' ') : timeParts[0]; 
  return {
    text: lastConv.text,
    time: time,
    sender: lastConv.sender
  };
}

const currentUserAvatar = 'https://evals-networkin.vercel.app/images/profiles/svanweelden.png'; // Generic user avatar
const currentUserName = "Div Garg";

function createPersonaListItem(personaId, personaData) {
  const listItem = document.createElement('div');
  // Class for an inactive tab, based on Alexa Richardson's example
  listItem.className = 'MuiStack-root css-7xq8uz injected-persona-tab'; 
  listItem.setAttribute('data-persona-id', personaId);

  const lastMessageDetails = getLastMessageDetails(personaData.conversations);
  let lastMessageText = lastMessageDetails.text;
  // Example shows "Sender: Message", let's try to mimic that a bit
  if (lastMessageDetails.sender === 'user') {
    lastMessageText = "You: " + lastMessageText;
  } else {
    // For persona's own last message, we could just show the text or prefix with their name
    // For now, just the text, as the tab already shows their name prominently.
  }
  const truncatedMessage = lastMessageText.substring(0, 25) + (lastMessageText.length > 25 ? '...' : '');

  listItem.innerHTML = `
    <div class="MuiStack-root css-1xhj18k">
        <div class="MuiAvatar-root MuiAvatar-circular css-dw7s7f">
            <img src="${personaData.avatar}" alt="${personaData.name}" class="MuiAvatar-img css-1hy9t21">
        </div>
        <div class="MuiStack-root css-j7qwjs">
            <h6 class="MuiTypography-root MuiTypography-subtitle2 css-9li3bp">${personaData.name}</h6>
            <span class="MuiTypography-root MuiTypography-caption MuiTypography-noWrap css-4hy15h">${truncatedMessage}</span>
        </div>
    </div>
    <div class="MuiStack-root css-dvxtzn">
        <span class="MuiTypography-root MuiTypography-caption css-1crdure">${lastMessageDetails.time}</span>
    </div>
  `;

  listItem.addEventListener('click', (event) => {
    activateInjectedPersonaTab(listItem, personaId, personaData);
  });
  return listItem;
}

function activateInjectedPersonaTab(clickedInjectedTabElement, personaId, personaData) {
    // Deactivate all tabs (native and injected) visually first
    document.querySelectorAll('.css-1a25cv3, .css-7xq8uz').forEach(item => {
      item.classList.remove('css-1a25cv3');
      if (!item.classList.contains('css-7xq8uz')) {
        item.classList.add('css-7xq8uz');
      }
    });

    // Activate the clicked injected tab visually
    clickedInjectedTabElement.classList.remove('css-7xq8uz');
    clickedInjectedTabElement.classList.add('css-1a25cv3');

    console.log(`[PERSONA TABS] Clicked injected persona: ${personaData.name}`);
    displayInjectedPersonaConversation(personaId, personaData);
}

function displayInjectedPersonaConversation(personaId, personaData) {
  const chatDisplayArea = document.querySelector('.css-1k8t7d9');
  if (!chatDisplayArea) {
    console.error("[PERSONA TABS] Target chat display area (.css-1k8t7d9) not found for injected content.");
    return;
  }

  const existingInjectedWrapper = chatDisplayArea.querySelector('#injectedPersonaChatWrapper');
  if (existingInjectedWrapper) {
    existingInjectedWrapper.remove();
  }

  Array.from(chatDisplayArea.children).forEach(child => {
    if (child.id !== 'injectedPersonaChatWrapper') {
        child.style.display = 'none';
    }
  });

  const wrapper = document.createElement('div');
  wrapper.id = 'injectedPersonaChatWrapper';

  // 1. Build Header for injected persona
  const headerContainer = document.createElement('div');
  headerContainer.className = 'MuiStack-root css-j7qwjs';
  headerContainer.innerHTML = `
    <div class="MuiStack-root css-1w1rbvj">
        <div class="MuiAvatar-root MuiAvatar-circular css-e0mej2">
            <img src="${personaData.avatar}" alt="${personaData.name}" class="MuiAvatar-img css-1hy9t21">
        </div>
        <a class="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineHover css-rak6dn" href="#">
            <h6 class="MuiTypography-root MuiTypography-subtitle1 css-8pcqri">${personaData.name}</h6>
        </a>
        <p class="MuiTypography-root MuiTypography-body2 css-19ku5ry">${personaData.title}</p>
    </div>
  `;
  wrapper.appendChild(headerContainer);

  // 2. Build Message List Container for injected persona
  const messagesOuterContainer = document.createElement('div');
  messagesOuterContainer.className = 'MuiStack-root css-ols67w';
  wrapper.appendChild(messagesOuterContainer);

  let lastMessageDate = null;
  personaData.conversations.forEach(msg => {
    const messageTimestamp = new Date(msg.timestamp.replace(/ (AM|PM)$/, ''));
    const messageDate = messageTimestamp.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    const messageTime = messageTimestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    if (messageDate !== lastMessageDate) {
      const dateDividerWrapper = document.createElement('div');
      dateDividerWrapper.className = 'MuiStack-root css-j7qwjs';
      dateDividerWrapper.innerHTML = `<div class="MuiDivider-root MuiDivider-fullWidth MuiDivider-withChildren css-x31c62" role="separator"><span class="MuiDivider-wrapper css-c1ovea">${messageDate}</span></div>`;
      messagesOuterContainer.appendChild(dateDividerWrapper);
      lastMessageDate = messageDate;
    }
    const messageBlockWrapper = document.createElement('div');
    messageBlockWrapper.className = 'MuiStack-root css-j7qwjs';
    const senderAvatar = msg.sender === 'user' ? currentUserAvatar : personaData.avatar;
    const senderName = msg.sender === 'user' ? currentUserName : personaData.name;
    messageBlockWrapper.innerHTML = `
      <div class="MuiStack-root css-14503qt">
          <div class="MuiAvatar-root MuiAvatar-circular css-1xyymuq"><img src="${senderAvatar}" alt="${senderName}" class="MuiAvatar-img css-1hy9t21"></div>
          <h6 class="MuiTypography-root MuiTypography-subtitle2 css-15l65lu">${senderName} •</h6>
          <p class="MuiTypography-root MuiTypography-body2 css-1yqp4jb">${messageTime}</p>
      </div>
      <div class="MuiStack-root css-f613ep"><p class="MuiTypography-root MuiTypography-body2 css-19ku5ry">${msg.text}</p></div>
    `;
    messagesOuterContainer.appendChild(messageBlockWrapper);
  });

  // 3. Build Message Input Area with IDs and modified Send button
  const messageInputArea = document.createElement('div');
  messageInputArea.className = 'MuiStack-root css-yqs3d4';
  messageInputArea.innerHTML = `
    <div class="MuiFormControl-root MuiTextField-root css-1i5nsmw">
        <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-multiline css-b9wq7m">
            <textarea id="injectedPersonaTextarea" aria-invalid="false" placeholder="Write a message" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline css-1b09epj" style="height: 66px;"></textarea>
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-v49clp"><legend class="css-ihdtdm"><span class="notranslate">​</span></legend></fieldset>
        </div>
    </div>
    <hr class="MuiDivider-root MuiDivider-fullWidth css-17jpz65">
    <div class="MuiStack-root css-htkyqj">
        <div class="MuiStack-root css-1xhj18k">
            <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-lw2d7w" tabindex="0" type="button"><svg viewBox="0 0 512 512"><path fill="currentColor" d="M416 64H96a64.07 64.07 0 0 0-64 64v256a64.07 64.07 0 0 0 64 64h320a64.07 64.07 0 0 0 64-64V128a64.07 64.07 0 0 0-64-64m-80 64a48 48 0 1 1-48 48a48.05 48.05 0 0 1 48-48M96 416a32 32 0 0 1-32-32v-67.63l94.84-84.3a48.06 48.06 0 0 1 65.8 1.9l64.95 64.81L172.37 416Zm352-32a32 32 0 0 1-32 32H217.63l121.42-121.42a47.72 47.72 0 0 1 61.64-.16L448 333.84Z"></path></svg></button>
            <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-lw2d7w" tabindex="0" type="button"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M11.314 3.121a5 5 0 1 1 7.07 7.071l-7.777 7.778a3 3 0 1 1-4.243-4.242l7.778-7.778l1.414 1.414l-7.778 7.778a1 1 0 1 0 1.414 1.414l7.779-7.778a3 3 0 1 0-4.243-4.243L4.95 12.314a5 5 0 0 0 7.07 7.07l8.486-8.485l1.414 1.415l-8.485 8.485a7 7 0 0 1-9.9-9.9z"></path></svg></button>
            <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-lw2d7w" tabindex="0" type="button"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1m10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></svg></button>
            <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-lw2d7w" tabindex="0" type="button"><svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2s4-2 4-2M9 9h.01M15 9h.01"></path></g></svg></button>
        </div>
        <div class="MuiStack-root css-5ax1kt">
            <button id="injectedPersonaSendButton" class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-disableElevation css-1lo8upn" type="button">Send</button>
            <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-lw2d7w" tabindex="0" type="button"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"></path></svg></button>
        </div>
    </div>
  `;
  wrapper.appendChild(messageInputArea);
  chatDisplayArea.appendChild(wrapper);

  // Add event listeners to the newly created input elements
  const textarea = document.getElementById('injectedPersonaTextarea');
  const sendButton = document.getElementById('injectedPersonaSendButton');

  if (textarea && sendButton) {
    // Initially disable send button
    sendButton.disabled = true;
    sendButton.classList.add('Mui-disabled'); // Re-add Mui-disabled if we want the MUI styling for disabled

    textarea.addEventListener('input', () => {
      if (textarea.value.trim() === '') {
        sendButton.disabled = true;
        sendButton.classList.add('Mui-disabled');
      } else {
        sendButton.disabled = false;
        sendButton.classList.remove('Mui-disabled');
      }
    });
    sendButton.addEventListener('click', () => processInjectedMessageSend(personaId));
  } else {
    console.error("[PERSONA TABS] Could not find injected textarea or send button to attach listeners.");
  }

  console.log("[PERSONA TABS] Injected persona content displayed for:", personaData.name);
}

function processInjectedMessageSend(personaId) {
  const textarea = document.getElementById('injectedPersonaTextarea');
  if (!textarea) return;

  const messageText = textarea.value.trim();
  if (messageText === '') return;

  const currentPersona = personas[personaId];
  if (!currentPersona) return;

  // Create a more user-friendly timestamp
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) 
                    + ' ' 
                    + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  currentPersona.conversations.push({
    sender: "user",
    text: messageText,
    timestamp: timestamp // Use the formatted timestamp
  });

  textarea.value = ''; // Clear the textarea
  // Manually trigger input event to re-disable send button
  textarea.dispatchEvent(new Event('input', { bubbles: true })); 

  // If the message is for Persona 5, add a stock response
  if (personaId === 'persona5') {
    // TODO: Replace this stock response with an LLM that intelligently responds.
    //       The prompt below should be used, incorporating the chat history.

    let prompt = `You are Alex Nova, an AI Researcher. Your goal is to respond intelligently and naturally to the ongoing conversation. 

Here is the current conversation history (newest messages last):
${JSON.stringify(currentPersona.conversations, null, 2)}

Based on this history, and the last message from the user: "${messageText}", provide a helpful and relevant response as Alex Nova.`
    
    // Generate a timestamp slightly after the user's message for the stock response
    const stockResponseTime = new Date(now.getTime() + 1000); // 1 second later
    const stockTimestamp = stockResponseTime.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) 
                         + ' ' 
                         + stockResponseTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    currentPersona.conversations.push({
      sender: "other", // Persona 5 is the sender
      text: "Thanks for your message! I'm processing your request.",
      timestamp: stockTimestamp
    });
    console.log("[PERSONA TABS] Added stock response for Persona 5.");
  }

  // Re-display the conversation with the new message
  displayInjectedPersonaConversation(personaId, currentPersona);
  console.log("[PERSONA TABS] Sent message to:", currentPersona.name, "; Message:", messageText);
}

function handleNativeTabClick() {
    console.log("[PERSONA TABS] Native tab clicked.");
    const chatDisplayArea = document.querySelector('.css-1k8t7d9');
    if (chatDisplayArea) {
        const injectedWrapper = chatDisplayArea.querySelector('#injectedPersonaChatWrapper');
        if (injectedWrapper) {
            injectedWrapper.remove();
            console.log("[PERSONA TABS] Removed injected persona content wrapper.");
        }
        // Unhide native content sections
        Array.from(chatDisplayArea.children).forEach(child => {
            child.style.display = ''; // Revert to default display (e.g., block, flex from stylesheet)
        });
        console.log("[PERSONA TABS] Attempted to unhide native content sections.");
    }
    // Deactivate all injected tabs visually
    document.querySelectorAll('.injected-persona-tab.css-1a25cv3').forEach(injectedTab => {
        injectedTab.classList.remove('css-1a25cv3');
        injectedTab.classList.add('css-7xq8uz');
    });
}

function actuallyInjectTabsAndCleanUp(containerElement, observer) {
  // Inject Persona Tabs
  Object.entries(personas).forEach(([personaId, personaData]) => {
    const listItem = createPersonaListItem(personaId, personaData);
    containerElement.prepend(listItem);
  });
  console.log("[PERSONA TABS] Successfully injected persona tabs into:", containerElement);

  // Add click listeners to NATIVE tabs
  const nativeTabs = containerElement.querySelectorAll('.MuiStack-root:not(.injected-persona-tab)'); // Basic selector for native tabs
  nativeTabs.forEach(nativeTab => {
    // Check if it looks like a main tab item (e.g. contains css-1xhj18k and css-dvxtzn)
    if (nativeTab.querySelector('.css-1xhj18k') && nativeTab.querySelector('.css-dvxtzn')) {
        console.log("[PERSONA TABS] Adding click listener to native tab:", nativeTab);
        nativeTab.addEventListener('click', handleNativeTabClick);
    }
  });

  if (observer) {
    observer.disconnect();
    console.log("[PERSONA TABS] Disconnected observer for tab container.");
  }
}

function injectNewPersonas() {
  const targetContainerSelector = '.css-xn5frc';
  const containerElement = document.querySelector(targetContainerSelector);

  if (containerElement) {
    console.log("[PERSONA TABS] Conversation list container found immediately:", containerElement);
    actuallyInjectTabsAndCleanUp(containerElement, null); // No observer needed if found instantly
    return;
  }

  console.warn(`[PERSONA TABS] Conversation list container (${targetContainerSelector}) not found initially. Setting up MutationObserver.`);

  let attempts = 0;
  const maxAttempts = 50; // roughly 5 seconds if mutations are frequent, or longer
  let injectionDone = false;

  const observer = new MutationObserver((mutationsList, obs) => {
    if (injectionDone) return;
    attempts++;

    const foundContainer = document.querySelector(targetContainerSelector);
    if (foundContainer) {
      console.log("[PERSONA TABS] Conversation list container found by MutationObserver:", foundContainer);
      injectionDone = true;
      actuallyInjectTabsAndCleanUp(foundContainer, obs); // Pass observer to disconnect it
      return;
    }

    if (attempts >= maxAttempts) {
      console.error(`[PERSONA TABS] Max attempts reached. Conversation list container (${targetContainerSelector}) not found.`);
      obs.disconnect(); // Stop observing
      console.log("[PERSONA TABS] Disconnected observer due to max attempts.");
    }
  });

  // Observe the whole document for additions, as the container might be added anywhere or at any level.
  observer.observe(document.documentElement, { childList: true, subtree: true });
  console.log("[PERSONA TABS] Observer started for tab container:", targetContainerSelector);
}

// Ensure this only runs on the messaging page
if (window.location.href.includes("/platform/messaging")) {
  // We don't strictly need DOMContentLoaded here anymore if injectNewPersonas uses an observer,
  // but it doesn't hurt to keep it as a general practice for when the script can start its work.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNewPersonas);
  } else {
    injectNewPersonas();
  }
} else {
  console.log("[PERSONA TABS] Not on messaging page, skipping persona tab injection.");
}

// --- Logic to hide the top banner using MutationObserver ---

const bannerSelector = 'div[role="alert"]'; // SIMPLIFIED SELECTOR FOR DEBUGGING

function hideTargetBanner(targetNode) {
  if (targetNode && targetNode.style) {
    targetNode.style.setProperty('display', 'none', 'important');
    targetNode.style.setProperty('visibility', 'hidden', 'important');
    console.log('[BANNER HIDER] Banner hidden or re-hidden (display & visibility):', targetNode);
  }
}

function findAndHideBanner() {
  const banner = document.querySelector(bannerSelector);
  if (banner) {
    console.log('[BANNER HIDER] Initial find: Banner found with selector:', bannerSelector, banner);
    hideTargetBanner(banner);
    return true;
  } else {
    console.log('[BANNER HIDER] Initial find: Banner NOT found with selector:', bannerSelector);
  }
  return false;
}

findAndHideBanner();

const observer = new MutationObserver((mutationsList, obs) => {
  // console.log('[BANNER HIDER] MutationObserver callback triggered. Mutations:', mutationsList);
  let foundAndHidBannerInThisBatch = false;

  for (const mutation of mutationsList) {
    // console.log('[BANNER HIDER] Mutation type:', mutation.type);
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches && node.matches(bannerSelector)) {
            console.log('[BANNER HIDER] Added node matches selector:', node);
            hideTargetBanner(node);
            foundAndHidBannerInThisBatch = true;
          } else if (node.querySelector) {
            const bannerInside = node.querySelector(bannerSelector);
            if (bannerInside) {
              console.log('[BANNER HIDER] Added node contains banner:', bannerInside);
              hideTargetBanner(bannerInside);
              foundAndHidBannerInThisBatch = true;
            }
          }
        }
      });
    } else if (mutation.type === 'attributes') {
      if (mutation.target.matches && mutation.target.matches(bannerSelector)) {
        // console.log('[BANNER HIDER] Attribute changed on a potential banner element:', mutation.target);
        if (mutation.target.style.display !== 'none') {
          console.log('[BANNER HIDER] Banner style changed to be visible, re-hiding...', mutation.target);
          hideTargetBanner(mutation.target);
          foundAndHidBannerInThisBatch = true;
        }
      }
    }
  }
  // if (foundAndHidBannerInThisBatch) {
  //   console.log('[BANNER HIDER] Observer confirmed banner processing in this batch.');
  // }
});

observer.observe(document.documentElement, { 
  childList: true, 
  subtree: true, 
  attributes: true, 
  attributeFilter: ['style']
});

// Note: It's good practice to disconnect the observer if the extension is unloaded 
// or the content script is re-injected, but for this case, it's generally fine.
// window.addEventListener('unload', () => observer.disconnect()); 
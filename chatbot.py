import openai

# Set your API key
openai.api_key = 'key_telegram'

def get_response(messages):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=150,
        temperature=0.7
    )
    return response.choices[0].message['content'].strip()

def chat_with_child():
    # Initialize conversation history
    messages = [
        {"role": "system", "content": "You are a fun and engaging assistant who helps children learn social skills through interactive stories and role-playing."}
    ]
    
    print("Hi there! 😊 I'm your friendly helper. Today, we’re going on an adventure to learn some cool skills! Which one sounds fun to you? Communication, Empathy, Cooperation, Conflict Resolution, Charity, or Public Speaking?")

    while True:
        user_input = input("You: ").strip().lower()
        
        if user_input in ['quit', 'exit']:
            print("Goodbye! Have a magical day! 🌟")
            break
        
        if user_input in ['communication', 'empathy', 'cooperation', 'conflict resolution', 'charity', 'public speaking']:
            skill_prompt = {
                'communication': "Imagine it's your best friend’s birthday, and you want to invite them to your party. But wait! There’s a fun twist. You can only use magical words to invite them. What magical words would you use?",
                'empathy': "Oh no! Your friend’s favorite toy just broke, and they’re feeling really sad. Let’s pretend we’re detectives on a mission to cheer them up. What special things could you do to make them smile again?",
                'cooperation': "You and your best buddy are superheroes with superpowers, but you need to work together to save the day! What amazing plans can you come up with to use your superpowers together and complete the mission?",
                'conflict resolution': "You and a friend have found a magical treasure chest, but there’s only one treasure inside. It’s up to you to find a way to share it without any arguments. How can you both be happy with the treasure?",
                'charity': "Imagine you’re organizing a big magical party to help animals in need. What fun activities and surprises can you plan to make sure everyone has a great time and the animals get lots of help?",
                'public speaking': "You’ve been invited to a magical storytelling contest, and you need to tell an exciting story to everyone. How can you practice to make your story sound super awesome and captivate your audience?"
            }
            
            # Start the conversation about the selected skill
            messages.append({"role": "user", "content": skill_prompt[user_input]})
            response = get_response(messages)
            print(f"Chatbot: {response}")
            messages.append({"role": "assistant", "content": response})

            while True:
                follow_up = input("You: ").strip()
                
                if follow_up.lower() in ['quit', 'exit']:
                    print("Goodbye! Have a magical day! 🌟")
                    return
                
                messages.append({"role": "user", "content": follow_up})
                response = get_response(messages)
                print(f"Chatbot: {response}")
                messages.append({"role": "assistant", "content": response})

                if any(keyword in follow_up.lower() for keyword in ['example', 'details', 'more', 'explain', 'question', 'other']):
                    # Enhance the response with additional details or examples
                    messages.append({"role": "system", "content": "Provide additional examples, details, or clarifications based on the user's request."})
                    continue
                
                # Exit the inner loop to return to the main menu
                break
        else:
            print("Oops! I didn’t quite catch that. Can you choose from: Communication, Empathy, Cooperation, Conflict Resolution, Charity, or Public Speaking?")

if __name__ == "__main__":
    chat_with_child()

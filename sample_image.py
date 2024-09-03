from PIL import Image, ImageDraw

# 이미지 크기 설정
width, height = 640, 360
color = (73, 109, 137)  # 이미지 배경색

# 빈 이미지 생성
img = Image.new('RGB', (width, height), color=color)

# Draw 객체 생성
draw = ImageDraw.Draw(img)

# 텍스트 추가
text = "Sample Video"
text_position = (width//4, height//2)
draw.text(text_position, text, fill=(255, 255, 255))

# 이미지 저장
img.save("sample_video.png")

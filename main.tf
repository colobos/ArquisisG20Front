resource "aws_s3_bucket" "my_bucket" {
  bucket = "nombre-de-tu-bucket"  # Reemplaza con el nombre deseado

  # Puedes agregar más configuraciones aquí, como políticas de acceso, encriptación, etc.
}

resource "aws_cloudfront_distribution" "my_distribution" {
    origin {
        domain_name = aws_s3_bucket.my_bucket.bucket_regional_domain_name
        origin_id   = "S3-${aws_s3_bucket.my_bucket.id}"
    }

    enabled             = true
    default_root_object = "index.html"  # Archivo por defecto

    # Otras configuraciones como caches, comportamiento, etc.

    viewer_certificate {
        # Agrega las configuraciones del certificado del visor aquí
    }

    default_cache_behavior {
        target_origin_id       = aws_cloudfront_origin_access_identity.s3_access_identity.id
        allowed_methods        = ["GET", "HEAD", "OPTIONS"]
        cached_methods         = ["GET", "HEAD"]
        viewer_protocol_policy = "redirect-to-https"
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }
}


resource "aws_cloudfront_origin_access_identity" "s3_access_identity" {
    comment = "Access identity for S3 bucket"
}

resource "aws_s3_bucket_policy" "s3_policy" {
    bucket = aws_s3_bucket.my_bucket.id

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Sid       = "Grant a CloudFront Origin Identity access to support private content"
                Effect    = "Allow"
                Principal = "*"
                Action    = "s3:GetObject"
                Resource  = "${aws_s3_bucket.my_bucket.arn}/*"
                Condition = {
                    StringLike = {
                        "aws:Referer": [
                            "http://d111111abcdef8.cloudfront.net/*",
                            "http://d111111abcdef8.cloudfront.net/index.html"
                        ]
                    }
                }
            }
        ]
    })
}